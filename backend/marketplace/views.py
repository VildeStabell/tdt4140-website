from django.shortcuts import render

from .serializers import *
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import permissions
from .serializers import SaleItemSerializer
from .models import SaleItem
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from rest_framework.viewsets import ModelViewSet


@api_view(['GET'])
def get_current_user(request):
    serializer = GetFullUserSerializer(request.user)
    return Response(serializer.data)


class CreateUserView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request):
        user = request.data.get('user')
        if not user:
            return Response({'response': 'error', 'message': 'No data found'})
        serializer = UserSerializerWithToken(data=user)
        if serializer.is_valid():
            saved_user = serializer.save()
        else:
            return Response({"response": "error", "message": serializer.errors})
        return Response({"response": "success", "message": "user created succesfully"})


class SaleItemView(ModelViewSet):
    permission_classes = (permissions.AllowAny, )
    serializer_class = SaleItemSerializer
    queryset = SaleItem.objects.all()
