from musicdjangoAPP import views
from django.contrib import admin
from django.urls import path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('index/', views.index, name="index"),
    path('songs/', views.songs, name="songs"),
    path('api/get-csrf-token/', views.getCSRF, name="getCSRF"),
    path('api/songs/', views.getSongs, name="getSongs")
    

]
