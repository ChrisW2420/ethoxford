from django.db import models
import uuid
from users.models import UserModel

class VirtualCardModel(models.Model):
  id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  address = models.TextField()
  date = models.DateTimeField(auto_now_add=True)
  user = models.ForeignKey(UserModel, on_delete=models.CASCADE, related_name='VirtualCard', blank=True)

  def __str__(self):
      return self.address
  