from django.shortcuts import render
import os
from django.http import FileResponse


def fileView(request):
    if request.path == '/':
        fileName = 'index.html'
    else:
        fileName = request.path[1:]
    sHostName = request.get_host()
    uniqueID = sHostName.split('.')[0]
    sFolderPath = os.path.join(os.getcwd(), "BuildedFiles", uniqueID)
    sFilePath = os.path.join(sFolderPath, fileName)
    file_extension = os.path.splitext(fileName)[1]
    if file_extension == '.css':
        return FileResponse(open(sFilePath, 'rb'), content_type='text/css')
    elif file_extension == '.js':
        return FileResponse(open(sFilePath, 'rb'), content_type='application/javascript')
    else:
        return FileResponse(open(sFilePath, 'rb'))

