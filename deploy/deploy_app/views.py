import os
import subprocess
from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
import shutil

# Create your views here.
class deploy(APIView):
    def post(self,request):
        folderName = request.data.get('uniqueID')
        sBaseDir = request.data.get('BaseDir')
        sCurrentDir = os.getcwd()
        sParentDir = os.path.dirname(sCurrentDir)
        sRepoFolder = os.path.join(sParentDir, 'upload', 'GithubFiles', folderName)
    
        # building the project - execuitng commands
        try:
            if sBaseDir != "./":
                sRepoFolder = os.path.join(sRepoFolder,sBaseDir)

            clProcess1 = subprocess.Popen(["npm", "install"], cwd=sRepoFolder)
            clProcess1.wait()
            clProcess2 = subprocess.Popen(["npm", "run", "build"], cwd=sRepoFolder)
            clProcess2.wait()
        except subprocess.CalledProcessError as e:
            return Response(data="Build Failed",status=status.HTTP_400_BAD_REQUEST)
        else:
            # move the files into the Builded Files folder
            sBuildFilesPath = os.path.join(sRepoFolder, 'build')
            sBuildedFolderPath = os.path.join(sParentDir, 'BuildedFiles', folderName)
            
            shutil.move(sBuildFilesPath, sBuildedFolderPath)
            return Response(data='Build Successfull',status=status.HTTP_200_OK)