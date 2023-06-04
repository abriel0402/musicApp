from django.db import models


class Song(models.Model):
    plays = models.IntegerField()
    likes = models.IntegerField()
    artist = models.CharField(max_length=25)
    name = models.CharField(max_length=25) 
    file = models.FileField()

class User(models.Model):
    username = models.CharField(max_length=25)
    password = models.CharField(max_length=25)
    displayname = models.CharField(max_length=25)
    totalplays = models.IntegerField()
    totallikes = models.IntegerField()

class Playlist(models.Model):
    name = models.CharField(max_length=25)
    #list of songs