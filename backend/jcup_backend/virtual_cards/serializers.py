from rest_framework import serializers
from .models import VirtualCardModel

class VirtualCardSerializer(serializers.ModelSerializer):
  class Meta:
    model = VirtualCardModel
    fields = (
      'id',
      'address',
      'date',
      'user'
    )