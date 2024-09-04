from django.contrib import admin
from .models import Topic
# Register your models here.

class TopicAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    search_fields = ["name"]
    list_filter = ("id", "name")

admin.site.register(Topic, TopicAdmin)