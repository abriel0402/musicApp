from django.db import models


class Song(models.Model):
    plays = models.IntegerField()
    likes = models.IntegerField()
    artist = models.CharField(max_length=25)
    name = models.CharField(max_length=25) 
    file = models.FileField(upload_to="songs/")


    def __str__(self):
        return str(self.id) + ": " + self.name + " - " + self.artist
    

class User(models.Model):
    username = models.CharField(max_length=25)
    password = models.CharField(max_length=25)
    displayName = models.CharField(max_length=25)
    totalPlays = models.IntegerField()
    totalLikes = models.IntegerField()

    def __str__(self):
        return self.username

class Playlist(models.Model):
    name = models.CharField(max_length=25)
    #songs = models.ManyToManyField('Song')
    #list of songs

    def __str__(self):
        return self.name