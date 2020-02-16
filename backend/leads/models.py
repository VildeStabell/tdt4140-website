from django.db import models


class User(models.Model):
    username = models.CharField(max_length=16)
    # edit to not store raw text later on
    password = models.CharField(max_length=16)
    email = models.EmailField(max_length=30)
    phone_num = models.IntegerField(max_length=10)
    first_name = models.CharField(max_length=16)
    last_name = models.CharField(max_length=16)
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.username


class Ad(models.Model):
    creator_id = models.CharField(max_length=10)
    ad_Text = models.TextField(max_length=1000)
    # add images e v e n t u a l l y
