# api/views.py

from rest_framework import generics
from .models import DataPoint
from .serializers import DataPointSerializer
from django_filters.rest_framework import DjangoFilterBackend

class DataPointList(generics.ListCreateAPIView):
    queryset = DataPoint.objects.all()
    serializer_class = DataPointSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['end_year', 'topic', 'sector', 'region', 'pestle', 'source', 'swot', 'country', 'city']
from django.shortcuts import render

# Create your views here.
