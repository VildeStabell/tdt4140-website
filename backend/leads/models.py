from django.db import models

class User(models.model):
    username = models.CharField(max_length=16)
    password = models.CharField(max_length=16)##edit to not store raw text later on
    email = models.EmailField
    phone_num = models.IntegerField(max_length=10)
    first_name = models.CharField(max_length=16)
    last_name = models.CharField(max_length=16)
    created_on = 


class Ad()