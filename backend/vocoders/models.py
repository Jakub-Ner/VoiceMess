from django.db import models

from customer.models import Customer


# Create your models here.
class Vocoder(models.Model):
    eleven_labs_id = models.CharField(max_length=100, primary_key=True)
    name = models.CharField(max_length=100)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
