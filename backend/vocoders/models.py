from django.db import models


class Vocoder(models.Model):
    name = models.CharField(max_length=100, primary_key=True)
    customer_id = models.ForeignKey('customer.Customer', on_delete=models.CASCADE)
    eleven_labs_id = models.CharField(max_length=100)
