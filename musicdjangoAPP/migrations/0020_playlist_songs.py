# Generated by Django 4.2.1 on 2023-06-25 17:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('musicdjangoAPP', '0019_alter_user_songsliked'),
    ]

    operations = [
        migrations.AddField(
            model_name='playlist',
            name='songs',
            field=models.ManyToManyField(to='musicdjangoAPP.song'),
        ),
    ]
