from django.shortcuts import render
from rest_framework import viewsets

from .serializers import CustomerSerializer
from .models import Customer


# Create your views here.
class CustomerViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = CustomerSerializer
    queryset = Customer.objects.all()
    # permission_classes = [permissions.IsAuthenticated]
