# -*- coding: utf-8 -*-
# Generated by Django 1.11.16 on 2019-01-27 23:25
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('interactives', '0012_auto_20181220_0115'),
    ]

    operations = [
        migrations.AddField(
            model_name='interactive',
            name='is_interactive',
            field=models.BooleanField(default=True),
        ),
    ]
