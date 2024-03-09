# Generated by Django 5.0.3 on 2024-03-09 15:49

import uuid
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("users", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="usermodel",
            name="id",
            field=models.UUIDField(
                default=uuid.UUID("744ea316-00f8-485a-a46c-1a130aa9f680"),
                editable=False,
                primary_key=True,
                serialize=False,
            ),
        ),
    ]
