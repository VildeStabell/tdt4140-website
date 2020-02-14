from django.db import models

class User(models.Model):
    username = models.CharField(max_length=16)
    password = models.CharField(max_length=16)##edit to not store raw text later on
    email = models.EmailField
    phone_num = models.IntegerField(max_length=10)
    first_name = models.CharField(max_length=16)
    last_name = models.CharField(max_length=16)
    created_on = models.DateTimeField(auto_now_add=True)


class Ad(models.Model):
    creator_id = models.CharField(max_length=10)
    ad_Text = models.TextField(max_length=1000)
    ##add images e v e n t u a l l y 
