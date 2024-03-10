from rest_framework import serializers
from .models import SubscriptionModel

class SubscriptionSerializer(serializers.ModelSerializer):
  class Meta:
    model = SubscriptionModel
    fields = (
      'id',
      'name',
      'price',
      'frequency',
      'date',
      'ticker',
      'smart_contract_address',
      'virtual_card_address',
      'user'
    )