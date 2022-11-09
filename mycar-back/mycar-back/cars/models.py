from django.contrib.auth.models import User
from django.db import models


class Country(models.Model):
    name = models.CharField(max_length=255)


class Car(models.Model):
    Category = (
        ('sedan', 'Sedan'),
        ('coupe', 'Coupe'),
        ('sport', 'Sport'),
        ('hatchback', 'Hatchback'),
        ('pickup', 'Pickup'),
        ('crossover','Crossover')
    )

    Brand= (
        ('bmw', 'BMW'),
        ('audi', 'Audi'),
        ('mitsubishi', 'MITSUBISHI'),
        ('porsche', 'PORSCHE'),
        ('volkswagen', 'VOLKSWAGEN'),
        ('kia', 'KIA'),
        ('hyundai','Hyundai'),
        ('toyota', 'Toyota'),
        ('ferarri', 'Ferarri'),
        ('tesla', 'Tesla'),
        ('lada', 'Lada'),
        ('jac', 'JAC'),

    )

    author = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    title = models.CharField(max_length=255)
    desc = models.TextField(null=True, blank=True)
    cover = models.ImageField()
    countries = models.ForeignKey(Country, on_delete=models.CASCADE, null=True, blank=True)
    category = models.CharField(max_length=100, choices=Category, null=True, blank=True)
    brand = models.CharField(max_length=100, choices=Brand, null=True, blank=True)
