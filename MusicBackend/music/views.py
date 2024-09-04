from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.exceptions import PermissionDenied
from .serializers import MusicSerializer
from .models import Music
# Create your views here.

class MusicListView(generics.ListAPIView):
    queryset = Music.objects.all()
    serializer_class = MusicSerializer
    permission_classes = [AllowAny]

class MusicView(generics.RetrieveAPIView):
    queryset = Music.objects.all()
    serializer_class = MusicSerializer
    permission_classes = [AllowAny]


class MusicCreate(generics.CreateAPIView):
    queryset = Music.objects.all()
    serializer_class = MusicSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if (user.is_authenticated and user.is_superuser):
            return Music.objects.all()
        else:
            return Music.objects.none()
        
    def perform_create(self, serializer):
        if (serializer.is_valid() and self.request.user.is_superuser):
            return super().perform_create(serializer)   
        else:
            raise PermissionDenied("You do not have permission to create this music.")

class MusicUpdate(generics.UpdateAPIView):
    queryset = Music.objects.all()
    serializer_class = MusicSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if (user.is_authenticated and user.is_superuser):
            return Music.objects.all()
        raise PermissionDenied("You do not have permission to detele this music.")


class MusicDelete(generics.DestroyAPIView):
    queryset = Music.objects.all()
    serializer_class = MusicSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if (user.is_authenticated and user.is_superuser):
            return Music.objects.all()
        raise PermissionDenied("You do not have permission to detele this music.")