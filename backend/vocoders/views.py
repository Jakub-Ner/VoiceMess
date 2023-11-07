from rest_framework import viewsets
from rest_framework.response import Response

# Create your views here.

from .serializers import VocoderSerializer
from .models import Vocoder
from customer.models import Customer


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
