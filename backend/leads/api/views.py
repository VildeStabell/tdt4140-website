from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions

from leads.models import User, Advert
from .serializers import UserSerializer, AdvertSerializer


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny, )


class AdvertViewSet(ModelViewSet):
    queryset = Advert.objects.all()
    serializer_class = AdvertSerializer
    permission_classes = (permissions.AllowAny, )
