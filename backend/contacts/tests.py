from django.test import TestCase
from customer.models import Customer
from vocoders.models import Vocoder
from contacts.models import Contact
from django.urls import reverse
class ContactCreateTestCase(TestCase):
    def setUp(self):
        self.customer = Customer.objects.create(facebook_id="Test Customer", card_id="123456789")
        self.vocoder = Vocoder.objects.create(eleven_labs_id="123", name="Test Vocoder", customer_id=self.customer)

    def test_add_vocoder_id_to_contact(self):
        contact = Contact.objects.create(contact_id="123", customer_id=self.customer, vocoder_id=self.vocoder)

        saved_contact = Contact.objects.get(contact_id="123")

        self.assertEqual(saved_contact.vocoder_id, self.vocoder)
        