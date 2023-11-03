# Generated by Django 4.2.7 on 2023-11-03 18:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("vocoders", "0001_initial"),
        ("customer", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Contact",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("contact_id", models.CharField(max_length=100, unique=True)),
                (
                    "customer",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="customer.customer",
                    ),
                ),
                (
                    "vocoder",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="vocoders.vocoder",
                    ),
                ),
            ],
        ),
    ]
