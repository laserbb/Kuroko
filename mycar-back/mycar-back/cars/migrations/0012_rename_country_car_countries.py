# Generated by Django 4.0.4 on 2022-11-08 22:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cars', '0011_country_alter_car_country'),
    ]

    operations = [
        migrations.RenameField(
            model_name='car',
            old_name='country',
            new_name='countries',
        ),
    ]
