from django.shortcuts import render
from rest_framework import generics
from django.contrib.auth.models import User
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.exceptions import PermissionDenied
from rest_framework import status
from django.utils import timezone

# Create your views here.

class ListUserView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if (user.is_authenticated):
            if (user.is_superuser):
                return User.objects.all()
            else:
                return User.objects.filter(id = user.id)
        return User.objects.none()


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class UpdateUserView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if (user.is_authenticated or user.is_superuser):
            return User.objects.filter(id = user.id)
        raise PermissionDenied("You do not have permission to update this account.")

class DeteleUserView(generics.DestroyAPIView):
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if (user.is_authenticated):
            if (user.is_superuser):
                return User.objects.all()
            else:
                return User.objects.filter(id = user.id)
        return User.objects.none()

# Ghi đè lại phương thức TokenObtainPairView: vì lớp này ko thể tự cập nhật thời gian last_login
class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == status.HTTP_200_OK:
            user = User.objects.get(username=request.data['username'])
            user.last_login = timezone.now()
            user.save()
        return response