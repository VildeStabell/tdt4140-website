from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class SaleItem(models.Model):
    title = models.CharField(max_length=30)
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    description = models.TextField()
    creation_date = models.DateField(auto_now=True)
    img = models.ImageField(upload_to='images/', null=True)

    def __str__(self):
        return self.title
