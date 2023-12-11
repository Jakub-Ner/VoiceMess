from elevenlabs import Voice, generate
from rest_framework import viewsets, views
from rest_framework.response import Response
from django.http import HttpResponse
from rest_framework.status import HTTP_500_INTERNAL_SERVER_ERROR, HTTP_400_BAD_REQUEST

from customer.models import Customer
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
        vocoder_list = Vocoder.objects.filter(customer=customer)
        return Response(self.serializer_class(vocoder_list, many=True).data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({"message": "Vocoder deleted successfully"})


class VocoderGenerateView(views.APIView):
    def post(self, request, *args, **kwargs):
        try:
            message = request.data['message']
            customer_id = request.data['customer_id']
        except Exception as e:
            print(e)
            return HttpResponse(content="Invalid request body, should be {message: <message>, eleven_labs_id: <eleven_labs_id>}", status=HTTP_400_BAD_REQUEST)

        eleven_labs_id = Vocoder.objects.filter(customer_id=customer_id).first()
        if not eleven_labs_id:
            eleven_labs_id = Vocoder.objects.filter(customer_id=Customer.objects.filter(name="default").first()).first()
        vocoder = Vocoder.objects.filter(eleven_labs_id=eleven_labs_id).first()
        try:
            audio = generate(text=f'{message}.',
                             voice=Voice(voice_id=vocoder.eleven_labs_id),
                             model="eleven_multilingual_v2")
        except Exception as e:
            print(e)
            return HttpResponse(content="error during generating audio", status=HTTP_500_INTERNAL_SERVER_ERROR)
        response = HttpResponse(content_type='audio/mp3')
        response.write(audio)
        return response
