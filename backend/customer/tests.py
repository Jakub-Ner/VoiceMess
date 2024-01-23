from django.test import TestCase
from rest_framework.test import APIClient
from django.urls import reverse
from .models import Customer
from .serializers import CustomerSerializer

class CustomerCreateTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.customer = Customer.objects.create(facebook_id="Test Customer", card_id="123456789",)

    def test_get_all_customers(self):
        url = reverse('customer-list')

        response = self.client.get(url)

        customers = Customer.objects.all()
        serializer = CustomerSerializer(customers, many=True)

        self.assertEqual(response.status_code, 200)

        self.assertEqual(response.data, serializer.data)
        
    def test_create_customer_with_invalid_data(self):
        url = reverse('customer-list')

        data = {
            'facebook_id': '',
            'card_id': '123456789',
        }

        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, 400)

        self.assertEqual(Customer.objects.count(), 1)