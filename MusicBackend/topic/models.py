from django.db import models

# Create your models here.
class Topic(models.Model):
    name = models.CharField(max_length=100)

    class Meta:
        db_table = 'topic'

    def __str__(self):
        return self.name