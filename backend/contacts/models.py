from django.db import models
from customer.models import Customer
from vocoders.models import Vocoder

# Create your models here.
class Contact(models.Model):
    contact_id = models.CharField(max_length=100)  # for now, the phone_number, but in future contact hash
    customer_id = models.ForeignKey(Customer, on_delete=models.CASCADE)
    vocoder_id = models.ForeignKey(Vocoder, on_delete=models.CASCADE, null=True, blank=True)

    class Meta:
        unique_together = (('contact_id', 'customer_id'),)
