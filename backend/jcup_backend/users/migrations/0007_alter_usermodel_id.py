# Generated by Django 4.2.11 on 2024-03-10 02:50

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0006_alter_usermodel_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usermodel',
            name='id',
            field=models.UUIDField(default=uuid.UUID('0c3c3af0-096d-40ee-b2f4-0be1da29fb95'), editable=False, primary_key=True, serialize=False),
        ),
    ]