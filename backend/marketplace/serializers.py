from rest_framework import serializers as sz
from .models import SaleItem


class SaleItemSerializer(sz.ModelSerializer):
    class Meta:
        model = SaleItem
        fields = ('id', 'title', 'creator', 'price',
                  'description', 'creation_date', 'img')
