from django.db import models


class Song(models.Model):
    plays = models.IntegerField()
    likes = models.IntegerField()
    artist = models.CharField(max_length=25)
    name = models.CharField(max_length=25) 
    file = models.FileField(upload_to="songs/")
    uploaderID = models.IntegerField()
    image = models.ImageField(blank=True, null=True, upload_to="images/")


    def __str__(self):
        return str(self.id) + ": " + self.name + " - " + self.artist
    

class User(models.Model):
    username = models.CharField(max_length=25)
    password = models.CharField(max_length=25)
    displayName = models.CharField(max_length=25)
    totalPlays = models.IntegerField()
    totalLikes = models.IntegerField()
    songsLiked = models.ManyToManyField('Song', blank=True)
    banner = models.ImageField(blank=True, null=True, default=None, upload_to="images/")
    

    def __str__(self):
        return str(self.id) + ": " + self.username

class Playlist(models.Model):
    name = models.CharField(max_length=25)
    songs = models.ManyToManyField('Song', blank=True)
    creatorID = models.IntegerField()

    def __str__(self):
        return str(self.id) + ": " + self.name
    
class Notification(models.Model):
    fromID = models.IntegerField()
    toID = models.IntegerField()
    content = models.CharField(max_length=25)

    def __str__(self):
        return str(self.id) + ": From " + str(self.fromID) + " to " + str(self.toID)