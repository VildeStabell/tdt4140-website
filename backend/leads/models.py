from django.db import models


class User(models.Model):
    username = models.CharField(max_length=16)
    # edit to not store raw text later on
    password = models.CharField(max_length=16)
    email = models.EmailField(max_length=30)
    phone_num = models.CharField(max_length=10)
    first_name = models.CharField(max_length=16)
    last_name = models.CharField(max_length=16)
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.username


class Advert(models.Model):
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    ad_text = models.TextField(max_length=1000)
    created_on = models.DateTimeField(auto_now_add=True)
    # add images e v e n t u a l l y
