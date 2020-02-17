from rest_framework.generics import ListAPIView, ListCreateAPIView
from rest_framework import permissions

from leads.models import User
from .serializers import UserSerializer


class UserListView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny, )


class UserCreateView(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny, )
