# Generated by Django 4.2.7 on 2023-11-03 18:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("customer", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Vocoder",
            fields=[
                (
                    "name",
                    models.CharField(max_length=100, primary_key=True, serialize=False),
                ),
                ("eleven_labs_id", models.CharField(max_length=100)),
                (
                    "customer",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="customer.customer",
                    ),
                ),
            ],
        ),
    ]
