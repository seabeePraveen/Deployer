from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Project(models.Model):
    uniqueID = models.CharField(max_length=100, unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tagName = models.CharField(max_length=100,blank=True,null=True)

    def __str__(self):
        return self.uniqueID
