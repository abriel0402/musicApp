# Generated by Django 4.2.1 on 2023-06-07 16:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('musicdjangoAPP', '0012_alter_user_options_alter_user_managers_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='song',
            name='file',
            field=models.FileField(upload_to=''),
        ),
    ]
