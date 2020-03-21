from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, IsAdminUser
from rest_framework.generics import (
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView)
from rest_framework.response import Response
from .serializers import SaleItemSerializer, UserSerializer, ForAdminUserSerializer
from .models import SaleItem
from rest_framework.viewsets import ModelViewSet
from rest_framework import status
from rest_framework.filters import SearchFilter, OrderingFilter
from .permissions import IsOwnerProfileOrAdminOrReadOnly, IsOwnerProfileOrAdminOrReadOnlyForSaleItem
from .models import User


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def restricted(request, *args, **kwargs):
    return Response(data="Only for logged in User", status=status.HTTP_200_OK)


class SaleItemView(ModelViewSet):
    queryset = SaleItem.objects.all()
    serializer_class = SaleItemSerializer
    permission_classes = [IsOwnerProfileOrAdminOrReadOnlyForSaleItem]
    serializer_class = SaleItemSerializer
    queryset = SaleItem.objects.all()
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ["title", "description", "price",
                     "creator__username", "creator__email", "creator__first_name", "creator__last_name"]
    ordering = ["-id"]



class UserProfileDetailView(RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsOwnerProfileOrAdminOrReadOnly]


class ForAdminUserView(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = ForAdminUserSerializer
    permission_classes = [IsAdminUser]
