from rest_framework import serializers as sz
from django.contrib.auth.models import User
from rest_framework.settings import api_settings
from .models import SaleItem


class GetFullUserSerializer(sz.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username', 'email', 'is_superuser','first_name', 'last_name')


class UserSerializerWithToken(sz.ModelSerializer):
    password = sz.CharField(write_only=True)
    token = sz.SerializerMethodField()

    def get_token(self, object):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
        payload = jwt_payload_handler(object)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        user.set_password(validated_data['password'])
        user.save()

        return user

    class Meta:
        model = User
        fields = ('token', 'username', 'password', 'first_name',
                  'last_name')


class SaleItemSerializer(sz.ModelSerializer):
    class Meta:
        model = SaleItem
        fields = ('id', 'title', 'creator',
                  'description', 'creation_date', 'img')
