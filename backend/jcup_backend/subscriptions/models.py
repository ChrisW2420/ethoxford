from django.db import models
import uuid
from users.models import UserModel

class SubscriptionModel(models.Model):
  id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

  name = models.CharField(max_length=255)
  price = models.DecimalField(max_digits=100, decimal_places=8)
  period = models.IntegerField()
  date_last_paid = models.DateTimeField(auto_now=True)
  date_pay_next = models.DateTimeField(null=True)
  ticker = models.CharField(max_length=255)
  
  smart_contract_address = models.TextField()
  virtual_card_address = models.TextField()

  user = models.ForeignKey(UserModel, on_delete=models.CASCADE, related_name='SmartContract', blank=True)

  def __str__(self):
      return str(self.name)
  