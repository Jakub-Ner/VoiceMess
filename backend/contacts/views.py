from django.shortcuts import render
from rest_framework import viewsets

from .serializers import ContactSerializer
from .models import Contact


# Create your views here.
class ContactViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = ContactSerializer
    queryset = Contact.objects.all()
    # permission_classes = [permissions.IsAuthenticated]
