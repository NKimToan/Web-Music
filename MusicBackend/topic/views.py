from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.exceptions import PermissionDenied
from .serializers import TopicSerializer
from .models import Topic
# Create your views here.


class TopicListView(generics.ListAPIView):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    permission_classes = [AllowAny]


class TopicView(generics.RetrieveAPIView):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    permission_classes = [AllowAny]


class TopicCreate(generics.CreateAPIView):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if (user.is_authenticated and user.is_superuser):
            return Topic.objects.all()
        else:
            return Topic.objects.none()
            
    # Hàm này ràng buộc chỉ có admin mới thêm được topic
    def perform_create(self, serializer):
        if (serializer.is_valid() and self.request.user.is_superuser):
            return super().perform_create(serializer)   
        else:
            raise PermissionDenied("You do not have permission to create this topic.")
        
    
class TopicUpdate(generics.UpdateAPIView):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if (user.is_authenticated and user.is_superuser):
            return Topic.objects.all()
        raise PermissionDenied("You do not have permission to update this topic.")

        
class TopicDelete(generics.DestroyAPIView):
    queryset = Topic.objects.all()
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if (user.is_authenticated and user.is_superuser):
            return Topic.objects.all()
        raise PermissionDenied("You do not have permission to detele this topic.")