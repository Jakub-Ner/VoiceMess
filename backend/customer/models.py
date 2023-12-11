from django.db import models



class Customer(models.Model):
    facebook_id = models.CharField(max_length=100, primary_key=True)
    card_id = models.CharField(max_length=100, null=True, blank=True)
    payment_date = models.DateField(null=True, blank=True)
    default_vocoder_id = models.CharField(max_length=100, default='GBv7mTt0atIp3Br8iCZE')
