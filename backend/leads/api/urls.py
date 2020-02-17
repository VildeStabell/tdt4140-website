from django.urls import path

from .views import UserViewSet, AdvertViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'advert', AdvertViewSet)
router.register(r'user', UserViewSet)
urlpatterns = router.urls
