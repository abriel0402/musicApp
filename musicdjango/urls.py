from musicdjangoAPP import views
from django.contrib import admin
from django.urls import path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('index/', views.index, name="index"),
    path('songs/', views.songs, name="songs"),
    path('song-upload/', views.songUploadPage, name="songUploadPage"),
    path('register/', views.register, name="register"),
    path('login/', views.login, name="login"),
    path('api/songs/', views.getSongs, name="getSongs"),
    

]
