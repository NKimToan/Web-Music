from rest_framework import serializers
from .models import Music
from topic.models import Topic
from topic.serializers import TopicSerializer
class MusicSerializer(serializers.ModelSerializer):
    topic = TopicSerializer(read_only=True)
    topic_id = serializers.PrimaryKeyRelatedField(queryset=Topic.objects.all(), write_only=True, source='topic')
    class Meta:
        model = Music
        fields = ['id', 'name', 'singer', 'music', 'image', 'topic', 'topic_id']
