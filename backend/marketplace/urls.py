from django.urls import path, include
from .views import *
from rest_framework.routers import DefaultRouter


urlpatterns = [

    # path('', include('djoser.urls')),
    # path('', include('djoser.urls.authtoken')),
    path('restricted/', restricted),

    path("all-profiles", UserProfileListCreateView.as_view(), name="all-profiles"),
    path("profile/<int:pk>", UserProfileDetailView.as_view(), name="profile"),
]