# Generated by Django 3.0.3 on 2020-02-21 10:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('marketplace', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='saleitem',
            old_name='creator_id',
            new_name='creator',
        ),
    ]