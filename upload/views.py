import os
from git import Repo
from django.shortcuts import render
from .utils import fnRandomNameGenerator
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response


class index(APIView):
    def post(self, request):
        sRepoURL = request.data.get("repoURL")
        sFolderName = fnRandomNameGenerator()
        repo = Repo.clone_from(sRepoURL, os.path.join(os.getcwd(), "uploadFiles", sFolderName))
        return Response(data="Cloned", status=status.HTTP_200_OK)
        
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
        return Response(data=clResponseData,headers=headers, status=status.HTTP_200_OK)
    
    