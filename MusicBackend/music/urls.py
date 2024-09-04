from django.urls import path
from . import views
urlpatterns = [
    path("music/views/", views.MusicListView.as_view(),name="view_musics"),
    path("music/view/<int:pk>/", views.MusicView.as_view(),name="view_music"),
    path("music/", views.MusicCreate.as_view(),name="create_music"),
    path("music/update/<int:pk>/", views.MusicUpdate.as_view(),name="update_music"),
    path("music/delete/<int:pk>/", views.MusicDelete.as_view(),name="delete_music"),
]