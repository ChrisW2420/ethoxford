from rest_framework import serializers
from .models import SmartContractModel

class SmartContractSerializer(serializers.ModelSerializer):
  class Meta:
    model = SmartContractModel
    fields = (
      'id',
      'address',
      'date',
      'user'
    )