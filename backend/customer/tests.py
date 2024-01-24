from django.test import TestCase
from rest_framework.test import APIClient
from django.urls import reverse
from .models import Customer
from .serializers import CustomerSerializer
from vocoders.models import Vocoder

class CustomerCreateTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.customer = Customer.objects.create(facebook_id="Test Customer")
        self.vocoder1 = Vocoder.objects.create(eleven_labs_id="123", name="Test Vocoder", customer_id=self.customer)
        self.vocoder2 = Vocoder.objects.create(eleven_labs_id="456", name="Test Vocoder 2", customer_id=self.customer)
        self.url = reverse('customer-update', kwargs={"pk": self.customer.facebook_id})

    def test_update_customer_default_vocoder_success(self):
        # update customer default vocoder to vocoder1
        data = {
            "facebook_id": self.customer.facebook_id,
            "default_vocoder_id": self.vocoder1.eleven_labs_id
        }

        response = self.client.patch(self.url, data)

        self.assertEqual(response.status_code, 200)
        # print(response.content)
        updated_customer = Customer.objects.get(facebook_id=self.customer.facebook_id)
        self.assertEqual(updated_customer.default_vocoder_id, self.vocoder1.eleven_labs_id)
        
        # update customer default vocoder to vocoder2
        data = {
            "facebook_id": self.customer.facebook_id,
            "default_vocoder_id": self.vocoder2.eleven_labs_id
        }

        response = self.client.patch(self.url, data)

        self.assertEqual(response.status_code, 200)
        # print(response.content)
        updated_customer = Customer.objects.get(facebook_id=self.customer.facebook_id)
        self.assertEqual(updated_customer.default_vocoder_id, self.vocoder2.eleven_labs_id)

    def test_update_customer_default_vocoder_failure(self):
        # update customer default vocoder to vocoder1
        data = {
            "default_vocoder_id": self.vocoder1.eleven_labs_id
        }

        response = self.client.patch(self.url, data)

        self.assertEqual(response.status_code, 400)