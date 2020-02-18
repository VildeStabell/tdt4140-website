from rest_framework import serializers

from leads.models import User, Advert


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email', 'phone_num',
                  'first_name', 'last_name', 'created_on')


class AdvertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Advert
        fields = ('id', 'creator', 'ad_text', 'created_on')
