# Generated by Django 4.2.7 on 2023-12-11 12:57

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Customer",
            fields=[
                (
                    "facebook_id",
                    models.CharField(max_length=100, primary_key=True, serialize=False),
                ),
                ("card_id", models.CharField(blank=True, max_length=100, null=True)),
                ("payment_date", models.DateField(blank=True, null=True)),
                (
                    "default_vocoder_id",
                    models.CharField(default="GBv7mTt0atIp3Br8iCZE", max_length=100),
                ),
            ],
        ),
    ]
