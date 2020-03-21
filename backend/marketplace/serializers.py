from rest_framework import serializers as sz
from .models import SaleItem
from djoser.serializers import UserSerializer as BaseUserSerializer


class SaleItemSerializer(sz.ModelSerializer):
    class Meta:
        model = SaleItem
        fields = ('id', 'title', 'creator', 'price',
                  'description', 'creation_date', 'img')


# Serializer for brukere
class UserSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        fields = (
            "username",
            "phone",
            "first_name",
            "last_name",
            "email",
            "id",
            "is_staff",
            "is_blocked")
        # skal ikke kunne redigeres
        read_only_fields = ("is_staff", "id", "is_blocked")


class ForAdminUserSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        fields = (
            "username",
            "phone",
            "first_name",
            "last_name",
            "email",
            "id",
            "is_staff",
            "is_blocked")
