from django.contrib import admin
from .models import Music
# Register your models here.

class MusicAdmin(admin.ModelAdmin):
    list_display = ("id","name","singer","music","image","topic")
    search_fields = ['name']
    list_filter = ("id","name","singer","music","image","topic")
admin.site.register(Music, MusicAdmin)