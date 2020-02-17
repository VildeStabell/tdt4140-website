from rest_framework import serializers

from leads.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email', 'phone_num',
                  'first_name', 'last_name', 'created_on')
