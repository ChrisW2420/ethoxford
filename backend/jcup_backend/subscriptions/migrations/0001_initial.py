# Generated by Django 4.2.11 on 2024-03-10 14:32

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='SubscriptionModel',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('price', models.DecimalField(decimal_places=8, max_digits=100)),
                ('period', models.IntegerField()),
                ('date_last_paid', models.DateTimeField(auto_now=True)),
                ('date_pay_next', models.DateTimeField(null=True)),
                ('ticker', models.CharField(max_length=255)),
                ('smart_contract_address', models.TextField()),
                ('virtual_card_address', models.TextField()),
                ('user', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='SmartContract', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
