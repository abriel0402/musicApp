from django.shortcuts import render, redirect
from musicdjangoAPP.models import Song
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


def getCSRF(request):
    csrf_token = get_token(request)
    return JsonResponse({
        'csrfToken': csrf_token
    })

def getSongs(request):
    songs = Song.objects.all().values()
    return JsonResponse(list(songs), safe=False)