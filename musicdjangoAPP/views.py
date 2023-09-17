import json, random
from django.shortcuts import render, redirect
from musicdjangoAPP.models import *
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import jwt
from google.cloud import storage

BROWSE_SONGS = 10 # how many songs to show in 'browse'

SONG_IMAGES_BUCKET_NAME = "song_images"
AUDIO_FILES_BUCKET_NAME = "audio_files42"

def index(request):
    return render(request, 'index.html')

@csrf_exempt
def songs(request):

    if request.method == "POST":
        print(request.FILES.get('file'))
        name = request.POST.get('name')
        artist = request.POST.get('artist')
        file = request.FILES.get('file')
        print("FILE NAME:" + file.name)
        image = request.FILES.get('image')
        
        print("IMG NAME:" + image.name)
        uploaderID = request.POST.get("uploaderID")

        audioFileURL = f'https://storage.googleapis.com/audio_files42/{file.name}'
        imageURL = f'https://storage.googleapis.com/song_images/{image.name}'
        
        song = Song(name=name, artist=artist, plays=0, likes=0, file=audioFileURL, uploaderID=uploaderID, image=imageURL)
        song.save()

        try:
            uploadToBucket(file, "audio_files42")
            uploadToBucket(image, "song_images")
        except Exception as e:
            print("Error uploading to bucket:", e)


    return render(request, 'index.html')

@csrf_exempt
def uploadToBucket(file, bucketName):
    print("bn:" + bucketName)
    client = storage.Client()
    bucket = client.get_bucket(bucketName)
    blob = bucket.blob(file.name)
    blob.upload_from_file(file)
    blob.make_public()

def songUploadPage(request):
    return render(request, 'index.html')

@csrf_exempt
def register(request):
    if request.method == "POST":
        displayName = request.POST.get('displayName')
        username = request.POST.get('username')
        password = request.POST.get('password')
        if len(displayName) > 0 and len(username) > 0 and len(password) > 0:
            user = User(displayName=displayName, username=username, password=password, totalLikes=0, totalPlays=0)
            user.save()
            print(user.displayName)
    
    return render(request, 'index.html')


@csrf_exempt
def login(request):
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        users = User.objects.all()
        for user in users:
            if user.username == username and user.password == password:
                encodedJWT = jwt.encode({'username': username}, 'secret', algorithm="HS256" )
                return JsonResponse({"token": encodedJWT, "username": username, "id": user.id})
    else:
        print("login failed")

    return render(request, 'index.html')

@csrf_exempt
def getSongs(request):
    if request.method == "POST":
        data = json.loads(request.body)
        uploaderID = data["uploaderID"]
        print(uploaderID)
        songs = Song.objects.filter(uploaderID=uploaderID).values()
        
        print(songs)
    return JsonResponse({"songs": list(songs)}, safe=False)

@csrf_exempt
def getPlaylists(request):
    data = json.loads(request.body)
    userID = data["userID"]
    playlists = Playlist.objects.filter(creatorID=userID).values()
    return JsonResponse(list(playlists), safe=False)


@csrf_exempt
def playlists(request):
    if request.method == "POST":
        name = request.POST.get("name")
        creatorID = request.POST.get("creatorID")
        playlist = Playlist(name=name, creatorID=creatorID)
        playlist.save()
        return redirect("/playlists/")
    return render(request, "index.html")

@csrf_exempt
def getPlaylistByID(request, playlistID):
    
    playlist = Playlist.objects.get(id=playlistID)
    songsList = []
    
    for song in playlist.songs.all():
        
        songData = {
            "id": song.id,
            "name": song.name,
            "artist": song.artist,
            "uploaderID": song.uploaderID,
            "file": str(song.file),
            "plays": song.plays,
            "likes": song.likes,
            "image": str(song.image),
        }
        songsList.append(songData)
    playlistData = {
        "id": playlist.id,
        "name": playlist.name,
        "songs": songsList
        
    }
        

    return JsonResponse({'playlist': playlistData}, content_type="application/json")

@csrf_exempt
def deleteSong(request):
    if request.method == "POST":
        data = json.loads(request.body)
        songID = data["songID"]
        uploaderID = data["uploaderID"]
        song = Song.objects.get(id=songID)
        song.delete()
        newSongs = Song.objects.filter(uploaderID=uploaderID).values()
        
        return JsonResponse(list(newSongs), safe=False)
    return render(request, "index.html")

@csrf_exempt
def fiveMostStreamed(request):
    songs = list(Song.objects.all().values())
    songs.sort(key = lambda song : song['plays'], reverse=True)
    if len(songs) > 5:
        songs = songs[:5]
    return JsonResponse({'songs': songs}, safe=False)

@csrf_exempt
def fiveMostLiked(request):
    songs = list(Song.objects.all().values())
    songs.sort(key = lambda song : song['likes'], reverse=True)
    if len(songs) > 5:
        songs = songs[:5]
    return JsonResponse({'songs': songs}, safe=False)

@csrf_exempt
def updatePlays(request):
    if request.method == "POST":
        data = json.loads(request.body)
        songID = data["songID"]
        song = Song.objects.get(id=songID)
        song.plays += 1
        song.save()
        userID = song.uploaderID
        user = User.objects.get(id=userID)
        user.totalPlays += 1
        user.save()
        return JsonResponse({"success": 'success'}, safe=False)
    return JsonResponse({"error": "error"})

@csrf_exempt
def updateLikes(request):
    if request.method == "POST":
        data = json.loads(request.body)
        songID = data["songID"]
        userID = data["userID"]
        toDo = data["toDo"]
        user = User.objects.get(id=userID)
        song = Song.objects.get(id=songID)
        uploader = User.objects.get(id=song.uploaderID)

        if toDo == "increment":
            song.likes += 1
            song.save()
            user.songsLiked.add(song)
            user.totalLikes += 1
            user.save()
            if uploader != user:
                content = user.username + ' liked your song "' + song.name + '"'
                notification = Notification(fromID=userID, toID=uploader.id, content=content)
                notification.save()
            
        else:
            song.likes -= 1
            song.save()
            user.songsLiked.remove(song)
            user.totalLikes -= 1
            user.save()
        
        return JsonResponse({"success": 'success'}, safe=False)
    return JsonResponse({"error": "error"})

def browse(request):
    songsToReturn = []
    allSongs = Song.objects.all().values()
    allSongs = list(allSongs)
    
    if len(allSongs) > BROWSE_SONGS:
        while len(songsToReturn) < BROWSE_SONGS:
            num = random.randint(0, len(allSongs)-1)
            if allSongs[num] not in songsToReturn:
                songsToReturn.append(allSongs[num])
    else:
        return JsonResponse({"songs": allSongs}, safe=False)
    return JsonResponse({"songs": songsToReturn}, safe=False)

@csrf_exempt
def search(request):
    if request.method == "POST":
        songsToReturn = []
        data = json.loads(request.body)
        text = data["text"]
        allSongs = Song.objects.all().values()
        allSongs = list(allSongs)
      

        for song in allSongs:
            if (text.lower() in song['name'].lower() and len(text) > 1) or (text.lower() in song['artist'].lower() and len(text) > 1):
                songsToReturn.append(song)
    return JsonResponse({"songs": songsToReturn}, safe=False)


@csrf_exempt
def profile(request):
    return render(request, "index.html")

@csrf_exempt
def getUserByID(request):
    if request.method == "POST":
        data = json.loads(request.body)
        userID = data["id"]
        print(userID)
        user = User.objects.get(id=userID)
        data = {
            "username": user.username,
            "displayName": user.displayName,
            "totalPlays": user.totalPlays,
            "totalLikes": user.totalLikes,
            "banner": str(user.banner),
            }
        
        return JsonResponse(data, safe=False)

@csrf_exempt
def getLikedSongs(request):
    if request.method == "POST":
        data = json.loads(request.body)
        userID = data["id"]
        user = User.objects.get(id=userID)
        songs = list(user.songsLiked.values_list('id', flat=True))
        
    return JsonResponse({"songs": songs}, safe=False)

@csrf_exempt
def getNotifications(request):
    if request.method == "POST":
        data = json.loads(request.body)
        userID = data["id"]
        notifications = list(Notification.objects.filter(toID=userID))
        newList = []
        for noti in notifications:
            notification = {
                "fromID": noti.fromID,
                "toID": noti.toID,
                "content": noti.content,
            }
            newList.append(notification)

        return JsonResponse({"notifications": newList}, safe=False)
    
@csrf_exempt
def clearNotifications(request):
    if request.method == "POST":
        data = json.loads(request.body)
        userID = data["id"]
        notifications = list(Notification.objects.filter(toID=userID))
        for noti in notifications:
            noti.delete()
        return JsonResponse({"message": "cleared"}, safe=False)
    

@csrf_exempt
def addSongToPlaylist(request):
    if request.method == "POST":
        data = json.loads(request.body)
        songID = data["songID"]
        playlistID = data["playlistID"]
        song = Song.objects.get(id=songID)
        playlist = Playlist.objects.get(id=playlistID)
        if song not in playlist.songs.all():
            playlist.songs.add(song)
            playlist.save()
            return JsonResponse({"message": "success"}, safe=False)
    return JsonResponse({"hi": "hi"}, safe=False)
        