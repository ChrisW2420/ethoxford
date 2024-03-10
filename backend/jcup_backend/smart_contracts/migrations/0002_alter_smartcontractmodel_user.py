# Generated by Django 4.2.11 on 2024-03-10 02:50

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('smart_contracts', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='smartcontractmodel',
            name='user',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='SmartContract', to=settings.AUTH_USER_MODEL),
        ),
    ]