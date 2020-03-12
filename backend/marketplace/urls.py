from django.urls import path, include
from .views import *
from rest_framework.routers import DefaultRouter


urlpatterns = [
    path(
        'restricted/',
        restricted),
    path(
        "all-profiles/",
        UserProfileListCreateView.as_view(),
        name="all-profiles"),
    path(
        "profile/<int:pk>/",
        UserProfileDetailView.as_view()),
]


# Router fixes urls for SaleItems
router = DefaultRouter()
router.register('saleItems', SaleItemView)
urlpatterns += router.urls
