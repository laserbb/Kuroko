# Generated by Django 4.0.4 on 2022-11-08 19:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cars', '0007_alter_country_name'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='car',
            name='price',
        ),
    ]