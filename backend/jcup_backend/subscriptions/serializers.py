from rest_framework import serializers
from .models import SubscriptionModel

class SubscriptionSerializer(serializers.ModelSerializer):
  class Meta:
    model = SubscriptionModel
    fields = (
      'id',
      'name',
      'price',
      'period',
      'date',
      'ticker',
      'smart_contract_address',
      'virtual_card_address',
      'user'
    )