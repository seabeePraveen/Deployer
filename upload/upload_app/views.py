import os
from git import Repo
from django.shortcuts import render
from .utils import fnRandomNameGenerator
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .serializer import UserSerializer

class index(APIView):
    def post(self, request):
        sRepoURL = request.data.get("repoURL")
        sFolderName = fnRandomNameGenerator()
        print("Cloning Started")
        try:
            repo = Repo.clone_from(sRepoURL, os.path.join(os.getcwd(), "GithubFiles", sFolderName))
        except Exception as e:
            print(str(e))
            return Response(data=str(e),status=status.HTTP_400_BAD_REQUEST)
        else:
            print("Cloned Succesfully")
        # if locally only
        
        # if uploading in cloud = s3
        # call the function for uploading the data in the cloud
        clResponseData = {
            'uniqueID':sFolderName,
        }
        return Response(data=clResponseData, status=status.HTTP_200_OK)
        
    def options(self,requst):
        headers = {
            'Allow': 'GET, OPTIONS',
            'Custom-Header': 'Custom-Value',
        }
        clResponseData = {
            'name':'upload api',
            'description':'Upload API',
            'renders':[
                'application/json',
                'text/html'
            ],
            'parses':[
                'application/json',
                'application/x-www-form-urlencoded',
                'multipart/form-data'
            ],
            'actions':{
                'POST':{
                    'repoURL':'URL of the git repository'
                }
            }
        }
        return Response(data=clResponseData, headers=headers, status=status.HTTP_200_OK)
    
class LoginUser(APIView):
    def post(self, request):
        try:
            username = request.data['username']
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response(data={
                "message":"user not found"
            }, status=status.HTTP_400_BAD_REQUEST)
        
        token_obj, _ = Token.objects.get_or_create(user=user)
        
        return Response(data={
            'token': str(token_obj),
            'email': str(user)  # Assuming you want to return the user's email
        }, status=status.HTTP_201_CREATED)
        
class RegisterUser(APIView):
    def post(self,request):
        serializer = UserSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(data={
                'message':str(serializer.errors)
            },status=status.HTTP_400_BAD_REQUEST)
            
        serializer.save()
        user = User.objects.get(username=serializer.data['username'])
        token_obj,_ = Token.objects.get_or_create(user=user)
        
        return Response(data={
            'token':str(token_obj)
        },status=status.HTTP_201_CREATED)