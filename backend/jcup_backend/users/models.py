from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
import uuid
from .managers import UserManager

# Create your models here.
class UserModel(AbstractBaseUser, PermissionsMixin):
  id = models.UUIDField(primary_key=True, default=uuid.uuid4(), editable=False)
  email = models.EmailField(max_length=255, unique=True)
  password = models.CharField(max_length=255)
  date = models.DateTimeField(auto_now_add=True)

  is_staff = models.BooleanField(default=False)
  is_active = models.BooleanField(default = True)
  is_superuser = models.BooleanField(default = False)

  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = []

  objects = UserManager()

  def __str__(self):
      return str(self.id)
  