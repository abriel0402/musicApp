from musicdjangoAPP import views
from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('index/', views.index, name="index"),
    path('api/playlistByID/<int:playlistID>/', views.getPlaylistByID, name='getPlaylistByID'),
    path('songs/', views.songs, name="songs"),
    path('song-upload/', views.songUploadPage, name="songUploadPage"),
    path('register/', views.register, name="register"),
    path('login/', views.login, name="login"),
    path('api/songs/', views.getSongs, name="getSongs"),
    path('api/delete/', views.deleteSong, name="deleteSong"),
    path('playlists/', views.playlists, name="playlists"),
    path('api/playlists/', views.getPlaylists, name="getPlaylists"),
    path('api/five-most-streamed/', views.fiveMostStreamed, name="fiveMostStreamed"),
    path('api/five-most-liked/', views.fiveMostLiked, name="fiveMostLiked"),
    path('api/update-plays/', views.updatePlays, name="updatePlays"),
    path('api/update-likes/', views.updateLikes, name="updateLikes"),
    path('browse/', views.browse, name="browse"),
    path('api/search/', views.search, name="search"),
    path('profile/', views.profile, name="profile"),
    path('get-user-by-id/', views.getUserByID, name="getUserByID"),
    path('api/get-liked-songs', views.getLikedSongs, name="getLikedSongs"),
    



]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
