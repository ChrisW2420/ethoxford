from rest_framework import serializers
from .models import SubscriptionModel
from datetime import datetime, timedelta

class SubscriptionSerializer(serializers.ModelSerializer):
  class Meta:
    model = SubscriptionModel
    fields = (
      'id',
      'name',
      'price',
      'period',
      'date_last_paid',
      'date_pay_next',
      'ticker',
      'smart_contract_address',
      'virtual_card_address',
      'user'
    )
