# Generated by Django 4.2.7 on 2023-11-03 18:41

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
            ],
        ),
    ]