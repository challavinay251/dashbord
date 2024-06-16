# api/urls.py

from django.urls import path
from .views import DataPointList

urlpatterns = [
    path('data/', DataPointList.as_view(), name='data-list'),
]
