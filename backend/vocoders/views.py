import os

from elevenlabs import Voice, generate, clone
from rest_framework import viewsets, views
from rest_framework.response import Response
from django.http import HttpResponse
from rest_framework.status import HTTP_500_INTERNAL_SERVER_ERROR, HTTP_400_BAD_REQUEST

from customer.models import Customer
from contacts.models import Contact
from .models import Vocoder
from .serializers import VocoderSerializer


class VocoderViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = VocoderSerializer
    queryset = Vocoder.objects.all()

    # permission_classes = [permissions.IsAuthenticated]

    def list(self, request, *args, **kwargs):
        customer_id = kwargs['customer_id']
        customer = Customer.objects.filter(pk=customer_id).first()
        vocoder_list = Vocoder.objects.filter(customer_id=customer)
        return Response(self.serializer_class(vocoder_list, many=True).data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        try:
            voice = Voice(voice_id=instance.eleven_labs_id)
            voice.delete()
        except Exception as e:
            print(f"error during deleting voice: {e}. Maybe the voice is built-in")
        self.perform_destroy(instance)
        return Response({"message": "Vocoder deleted successfully"})

    def create(self, request, *args, **kwargs):
        try:
            print(request.data)
            customer_id = kwargs['customer_id']
            name = list(request.data.keys())[0]
            f = request.data[name]
        except Exception as e:
            print(f"Invalid request body: lacking field {e}")
            return HttpResponse(content=f"Invalid request body: lacking field {e}", status=HTTP_400_BAD_REQUEST)

        with open(f"./{name}.mp3", "wb+") as destination:
            for chunk in f.chunks():
                destination.write(chunk)
        try:
            customer = Customer.objects.filter(pk=customer_id).first()
            if not customer:
                print("Customer not found")
                return HttpResponse(content="Customer not found", status=HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(f"error during getting customer: {e}")
            return HttpResponse(content="error during getting customer", status=HTTP_500_INTERNAL_SERVER_ERROR)

        try:
            generated_voice = clone(name=name, files=[f'./{name}.mp3'])
            eleven_labs_id = generated_voice.voice_id
            os.remove(f"{name}.mp3")
        except Exception as e:
            print(f"error during generating voice: {e}")
            return HttpResponse(content="error during generating voice", status=HTTP_500_INTERNAL_SERVER_ERROR)

        vocoder = Vocoder.objects.create(name=name, customer_id=customer, eleven_labs_id=eleven_labs_id)
        vocoder.save()
        return Response(self.serializer_class(vocoder).data)


class VocoderGenerateView(views.APIView):
    def post(self, request, *args, **kwargs):
        try:
            message = request.data['message']
            contact_id = request.data['contact_id']
            facebook_id = request.data['facebook_id']
        except Exception as e:
            print(f"Invalid request body: lacking field {e}")
            return HttpResponse(content=f"Invalid request body: lacking field {e}", status=HTTP_400_BAD_REQUEST)
        try:
            vocoder = Contact.objects.filter(contact_id=contact_id, customer_id=facebook_id).first().vocoder_id
            if not vocoder:
                eleven_labs_id = Customer.objects.filter(facebook_id=facebook_id).first().default_vocoder_id
            else:
                eleven_labs_id = vocoder.eleven_labs_id
        except Exception as e:
            print(f"error during getting vocoder: {e}")
            return HttpResponse(content="error during getting vocoder", status=HTTP_500_INTERNAL_SERVER_ERROR)
        try:
            audio = generate(text=f'{message}.',
                             voice=Voice(voice_id=eleven_labs_id),
                             model="eleven_multilingual_v2")
        except Exception as e:
            print(f"error during generating audio: {e}")
            return HttpResponse(content="error during generating audio", status=HTTP_500_INTERNAL_SERVER_ERROR)
        response = HttpResponse(content_type='audio/mp3')
        response.write(audio)
        return response
