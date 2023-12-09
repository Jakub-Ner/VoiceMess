import os
from datetime import date, timedelta

from django.db import transaction
from django.core.management.base import BaseCommand
from django.core.management import call_command
from elevenlabs import voices, Voice, generate

from customer.models import Customer
from vocoders.models import Vocoder


class Command(BaseCommand):
    help = "Generates dummy data"

    def __init__(self):
        input("This command will delete all data in the database. Press CTRL+C to cancel or ENTER to continue.")
        os.remove('db.sqlite3')
        call_command('migrate')
        super().__init__()

    @transaction.atomic
    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Generating dummy data'))
        customer_ner = Customer.objects.create(
            facebook_id='123456789',
            card_id='123456789',
            payment_date=date.today() + timedelta(days=20),
        )
        customer_ner.save()

        customer_random = Customer.objects.create(
            facebook_id='faceborokId',
            card_id='987654321',
            payment_date=date.today(),
        )
        customer_random.save()
        self.stdout.write(self.style.SUCCESS('Successfully generated customers'))

        el_voices = voices()
        for i in range(10):
            eleven_labs_vocoder = el_voices[i]
            if i % 2 == 0:
                Vocoder.objects.create(
                    name=eleven_labs_vocoder.name,
                    customer=customer_ner,
                    eleven_labs_id=eleven_labs_vocoder.voice_id,
                ).save()
            else:
                Vocoder.objects.create(
                    name=eleven_labs_vocoder.name + " 007",
                    customer=customer_random,
                    eleven_labs_id=eleven_labs_vocoder.voice_id,
                ).save()
        self.stdout.write(self.style.SUCCESS('Successfully generated vocoders'))

        try:
            vocoder = Vocoder.objects.get(name='Rachel')
            audio = generate(text='Witaj świecie!',
                             voice=Voice(voice_id=vocoder.eleven_labs_id),
                             model="eleven_multilingual_v2")
            with open('test-audio-rachel.wav', 'wb') as f:
                f.write(audio)
            self.stdout.write(self.style.SUCCESS('Successfully generated audio. You can find it in test-audio-rachel.wav'))

        except Exception as e:
            self.stdout.write(self.style.ERROR('Failed to generate audio: ' + str(e)))
