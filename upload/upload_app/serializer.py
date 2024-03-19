from django.contrib.auth.models import User
from rest_framework import serializers
from django.http import JsonResponse
from .models import Project

class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ['id','username','password']
        
    def create(self,validated_data):
        user = User.objects.create(username=validated_data['username'])
        user.set_password(validated_data['password'])
        user.save()
        return user
    
class ProjectSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Project
        fields = ['uniqueID','user','tagName']