from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import *

urlpatterns = [
    path('current_user/', get_current_user),
    path('users/create', CreateUserView.as_view()),
]

router = DefaultRouter()
router.register('saleItems', SaleItemView)
urlpatterns += router.urls
