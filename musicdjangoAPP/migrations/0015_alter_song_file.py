# Generated by Django 4.2.1 on 2023-06-07 20:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('musicdjangoAPP', '0014_alter_song_file'),
    ]

    operations = [
        migrations.AlterField(
            model_name='song',
            name='file',
            field=models.FileField(upload_to=''),
        ),
    ]