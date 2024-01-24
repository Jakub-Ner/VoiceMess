from datetime import date
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import Customer
from .serializers import CustomerSerializer

class CustomerViewSetTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_create_customer_ok(self):
        url = reverse('customers')
        data = {
            'facebook_id': 'test_facebook_id',
            'card_id': 'test_card_id',
            'payment_date': '2020-01-01',
            'default_vocoder_id': 'test_default_vocoder_id'
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Customer.objects.count(), 1)
        self.assertEqual(Customer.objects.get().facebook_id, 'test_facebook_id')
        self.assertEqual(Customer.objects.get().card_id, 'test_card_id')
        self.assertEqual(Customer.objects.get().payment_date, date(2020, 1, 1))
        self.assertEqual(Customer.objects.get().default_vocoder_id, 'test_default_vocoder_id')

    def test_create_customer_missing_field(self):
        url = reverse('customers')
        data = {
            'card_id': 'test_card_id',
            'payment_date': '2020-01-01',
            'default_vocoder_id': 'test_default_vocoder_id'
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Customer.objects.count(), 0)
