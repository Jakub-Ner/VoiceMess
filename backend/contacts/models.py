from django.db import models
from customer.models import Customer
from vocoders.models import Vocoder

# Create your models here.
class Contact(models.Model):
    contact_id = models.CharField(max_length=100, unique=True, primary_key=True)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    vocoder = models.ForeignKey(Vocoder, on_delete=models.CASCADE)

