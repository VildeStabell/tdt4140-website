from django.urls import path, include
from .views import *
from rest_framework.routers import DefaultRouter


urlpatterns = [
    path(
        'restricted/',
        restricted),

    path(
        "profile/<int:pk>/",
        UserProfileDetailView.as_view(),
        name="profile"),

]


# Router fixes urls for SaleItems
router = DefaultRouter()
router.register('saleItems', SaleItemView)
router.register('admin', ForAdminUserView)

urlpatterns += router.urls

