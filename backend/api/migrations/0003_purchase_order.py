# Generated by Django 5.0 on 2023-12-27 07:19

import api.models
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_customer_email_alter_customer_phone'),
    ]

    operations = [
        migrations.CreateModel(
            name='Purchase_Order',
            fields=[
                ('Purchase_id', models.CharField(default=api.models.random_pid, max_length=255, primary_key=True, serialize=False)),
                ('Product_name', models.CharField(max_length=255)),
                ('Quality', models.IntegerField()),
                ('Pricing', models.FloatField(max_length=255)),
                ('mrp', models.FloatField(max_length=255, unique=True)),
                ('Customer_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.customer')),
            ],
            options={
                'db_table': 'Purchase',
            },
        ),
    ]
