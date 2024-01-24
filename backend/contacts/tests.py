from django.test import TestCase
from customer.models import Customer
from vocoders.models import Vocoder
from contacts.models import Contact
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status

class ContactCreateTestCase(TestCase):
    
    def setUp(self):
        self.client = APIClient()

        self.customer = Customer.objects.create(facebook_id="Test_Customer", card_id="123456789")
        self.vocoder = Vocoder.objects.create(eleven_labs_id="123", name="Test Vocoder", customer_id=self.customer)
        self.vocoder2 = Vocoder.objects.create(eleven_labs_id="456", name="Test Vocoder 2", customer_id=self.customer)

        self.url = reverse("contact-create")
        

    def test_create_contact_success(self):
        data = {
            "contact_id": "test_contact_id",
            "customer_id": self.customer.facebook_id,
            "vocoder_id": self.vocoder.eleven_labs_id
        }
        response = self.client.post(self.url,data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Contact.objects.count(), 1)
        contact = Contact.objects.first()
        self.assertEqual(contact.customer_id, self.customer)
        self.assertEqual(contact.vocoder_id, self.vocoder)
        return contact


    def test_create_contact_failure(self):
        data = {
            "customer_id": self.customer.facebook_id,
            "vocoder_id": self.vocoder.eleven_labs_id
        }
        response = self.client.post(self.url, data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Contact.objects.count(), 0)
    

    # change vocoder for contact test
    def test_update_contact_vocoder_success(self):
        # create contact
        test_contact = self.test_create_contact_success()

        urlUpdate = reverse("contact-update", kwargs={"pk": test_contact.contact_id})

        data = {
            "customer_id": test_contact.customer_id.facebook_id,
            "contact_id": test_contact.contact_id,
            "vocoder_id": self.vocoder2.eleven_labs_id
        }

        # update contact
        response = self.client.patch(urlUpdate, data)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        updated_contact = Contact.objects.first()
        self.assertEqual(updated_contact.vocoder_id, self.vocoder2)


    # change vocoder for contact test
    def test_update_contact_vocoder_failure(self):
        # create contact
        test_contact = self.test_create_contact_success()

        urlUpdate = reverse("contact-update", kwargs={"pk": test_contact.contact_id})

        data = {
            "contact_id": test_contact.contact_id,
            "vocoder_id": self.vocoder2.eleven_labs_id
        }
        # update contact
        response = self.client.patch(urlUpdate, data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
