# Generated by Django 4.2.1 on 2023-06-06 21:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('musicdjangoAPP', '0005_song_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='song',
            name='user',
        ),
    ]