import io
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from .models import Vocoder
from customer.models import Customer

class VocoderCreateTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        test_customer = Customer.objects.create(facebook_id='Test Customer')
        test_customer.save()
        self.customer_id = test_customer.facebook_id
        self.url = reverse('vocoder-create', kwargs={'customer_id': self.customer_id})

    def test_create_vocoder_success(self):
        with open('testing_voice.mp3', 'rb') as f:
            audio = f.read()

        FILE_NAME = 'file_name.mp3'
        file_data = {
            FILE_NAME: io.BytesIO(audio)
        }

        response = self.client.post(self.url, data=file_data, format='multipart')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(Vocoder.objects.count(), 1)
        vocoder = Vocoder.objects.first()
        self.assertEqual(vocoder.name, FILE_NAME)
        self.assertEqual(vocoder.customer_id.facebook_id, self.customer_id)
        self.assertIsNotNone(vocoder.eleven_labs_id)

    def test_create_vocoder_invalid_request(self):
        # Make a POST request without providing the required file data
        response = self.client.post(self.url, data={}, kwargs={'customer_id': self.customer_id})

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('Invalid request body', response.content.decode())

        self.assertEqual(Vocoder.objects.count(), 0)

