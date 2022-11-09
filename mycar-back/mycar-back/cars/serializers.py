from rest_framework import serializers
from rest_framework.fields import SerializerMethodField

from cars.models import Car, Country
from user_auth.serializers import UserCommonSerializer


class CountryCommonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = '__all__'


class CarCommonSerializer(serializers.ModelSerializer):
    author = UserCommonSerializer()
    countries = CountryCommonSerializer()
    brand = SerializerMethodField()
    category = SerializerMethodField()

    class Meta:
        model = Car
        fields = '__all__'

    def get_brand(self, obj):
        return [x[1] for x in Car.Brand if x[0] == obj.brand][0]

    def get_category(self, obj):
        return [x[1] for x in Car.Category if x[0] == obj.category][0]


class CarCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = '__all__'
