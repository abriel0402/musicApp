# Generated by Django 4.2.1 on 2023-06-04 18:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('musicdjangoAPP', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='displayname',
            new_name='displayName',
        ),
        migrations.RenameField(
            model_name='user',
            old_name='totallikes',
            new_name='totalLikes',
        ),
        migrations.RenameField(
            model_name='user',
            old_name='totalplays',
            new_name='totalPlays',
        ),
    ]
