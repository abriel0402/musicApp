import json, random
from django.shortcuts import render, redirect
from musicdjangoAPP.models import *
from django.middleware.csrf import get_token
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

def index(request):
    return render(request, 'index.html')

@csrf_exempt
def songs(request):
    
    if request.method == "POST":
        print(request.FILES.get('file'))
        name = request.POST.get('name')
        artist = request.POST.get('artist')
        file = request.FILES.get('file')
        song = Song(name=name, artist=artist, plays=0, likes=0, file=file)
        song.save()
        print(song.name)
        print(song.artist)
        print(song.file)
    return render(request, 'index.html')

def songUploadPage(request):
    return render(request, 'index.html')

@csrf_exempt
def register(request):
    if request.method == "POST":
        displayName = request.POST.get('displayName')
        username = request.POST.get('username')
        password = request.POST.get('password')
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
                print("login success")
                return JsonResponse({"status": True})
    else:
        print("login failed")

    return render(request, 'index.html')


def getSongs(request):
    songs = Song.objects.all().values()
    return JsonResponse(list(songs), safe=False)

def getPlaylists(request):
    playlists = Playlist.objects.all().values()
    return JsonResponse(list(playlists), safe=False)


@csrf_exempt
def playlists(request):
    if request.method == "POST":
        name = request.POST.get("name")
        playlist = Playlist(name=name)
        playlist.save()
        return redirect("/playlists/")
    return render(request, "index.html")

@csrf_exempt
def getPlaylistByID(request, playlistID):
    
    playlist = Playlist.objects.get(id=playlistID)
    playlistData = {
        "id": playlist.id,
        "name": playlist.name,
    }

    return JsonResponse({'playlist': playlistData}, content_type="application/json")

@csrf_exempt
def deleteSong(request):
    if request.method == "POST":
        data = json.loads(request.body)
        songID = data["songID"]
        song = Song.objects.get(id=songID)
        song.delete()
        newSongs = Song.objects.all().values()
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
        return JsonResponse({"success": 'success'}, safe=False)
    return JsonResponse({"error": "error"})

@csrf_exempt
def updateLikes(request):
    if request.method == "POST":
        data = json.loads(request.body)
        songID = data["songID"]
        toDo = data["toDo"]
        song = Song.objects.get(id=songID)
        if toDo == "increment":
            song.likes += 1
            song.save()
            
        else:
            song.likes -= 1
            song.save()
        
        return JsonResponse({"success": 'success'}, safe=False)
    return JsonResponse({"error": "error"})

def browse(request):
    songsToReturn = []
    allSongs = Song.objects.all().values()
    allSongs = list(allSongs)
    songsToShow = 5
    if len(allSongs) > songsToShow:
        while len(songsToReturn) < songsToShow:
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
            if text.lower() in song['name'].lower() and text != "":
                songsToReturn.append(song)
    return JsonResponse({"songs": songsToReturn}, safe=False)
