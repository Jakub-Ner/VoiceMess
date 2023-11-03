from django.shortcuts import render
from rest_framework import viewsets
# Create your views here.

from .serializers import VocoderSerializer
from .models import Vocoder


class VocoderViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = VocoderSerializer
    queryset = Vocoder.objects.all()
    # permission_classes = [permissions.IsAuthenticated]
