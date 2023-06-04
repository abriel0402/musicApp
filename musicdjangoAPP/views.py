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
                loggedIn = True
                return JsonResponse({"status": True})
    else:
        print("login failed")

    return render(request, 'index.html')


def getSongs(request):
    songs = Song.objects.all().values()
    return JsonResponse(list(songs), safe=False)