from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend
from knox.models import AuthToken
from knox.auth import TokenAuthentication
from rest_framework.filters import SearchFilter
from rest_framework.generics import ListCreateAPIView, ListAPIView, CreateAPIView, GenericAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated

from cars.serializers import CarCommonSerializer, CountryCommonSerializer, CarCreateSerializer
from cars.models import Car, Country


class CarCreateView(CreateAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    queryset = Car.objects.all()
    serializer_class = CarCreateSerializer

    def post(self, request, *args, **kwargs):
        print(request.data)
        request.data['author'] = self.request.user.id
        return super().post(request, *args, **kwargs)


class CarListView(ListAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    queryset = Car.objects.all()
    serializer_class = CarCommonSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('author', 'title', 'desc', 'countries', 'category', 'brand')


# my cars
class CarMyView(ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = Car.objects.all()
    serializer_class = CarCommonSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('author', 'title', 'desc', 'countries', 'category', 'brand')

    def get_queryset(self):
        return Car.objects.filter(owner=self.request.user)


# 10 random cars
class CarRandomView(ListAPIView):
    queryset = Car.objects.all().order_by('countries_id')[:10]
    serializer_class = CarCommonSerializer


class CountryCommonView(ListCreateAPIView):
    queryset = Country.objects.all()
    serializer_class = CountryCommonSerializer


class CarSearchView(ListCreateAPIView):
    queryset = Car.objects.all()
    serializer_class = CarCommonSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    filter_fields = ('author', 'title', 'desc', 'countries', 'category', 'brand')
    search_fields = ('author__username', 'author__first_name', 'author__last_name', 'title', 'desc')


class CarRetrieveView(RetrieveAPIView):
    queryset = Car.objects.all()
    serializer_class = CarCommonSerializer
