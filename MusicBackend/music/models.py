from django.db import models
from topic.models import Topic
# Create your models here.
 
class Music(models.Model):
    name = models.CharField(max_length=100)
    singer = models.CharField(max_length=100)
    music = models.FileField(upload_to="musics/")
    image = models.ImageField(upload_to="images/")
    topic = models.ForeignKey(Topic, default=None, on_delete=models.PROTECT)
    # topic = models.ForeignKey(Topic, default=None, on_delete=models.CASCADE)

    class Meta:
        db_table = 'music'
    
    def __str__(self):
        return self.name, self.singer