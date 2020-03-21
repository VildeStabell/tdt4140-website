from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    email = models.EmailField(verbose_name='email', max_length=255, unique=True)
    phone = models.CharField(null=True, max_length=255)
    is_blocked = models.BooleanField(default=False)
    REQUIRED_FIELDS = ['username', 'phone', 'first_name', 'last_name', 'is_blocked']
    USERNAME_FIELD = 'email'

    def get_username(self):
        return self.email


class SaleItem(models.Model):
    title = models.CharField(max_length=30)
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    price = models.IntegerField(default=0)
    description = models.TextField()
    creation_date = models.DateField(auto_now=True)
    img = models.ImageField(upload_to='images/', null=True)

    def __str__(self):
        return self.title

