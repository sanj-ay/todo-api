from django.shortcuts import render
from .models import Task
from .serializers import taskSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def apiOverview(request):
    api_urls={
        'List':'/task-list',
        'Create':'/create-task/',
        'Delete':'/delete-task/<str:pk>',
        'Clear':'/clearall',
    }
    return Response(api_urls)

@api_view(['GET'])
def taskList(request):
    list=Task.objects.all().order_by('-id')
    serializer=taskSerializer(list,many=True)
    return Response(serializer.data)


@api_view(['POST'])
def createTask(request):
    serializer=taskSerializer(data=request.data)
    if serializer.is_valid() :
        serializer.save()
    return Response(serializer.data)


@api_view(['POST'])
def updateTask(request,pk):
    task=Task.objects.get(id=pk)
    serializer=taskSerializer(instance=task,data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['DELETE'])
def deleteTask(request,pk):
    task=Task.objects.get(id=pk)
    task.delete()
    return Response('Item succsesfully deleted!')


@api_view(['DELETE'])
def removeCompleted(request):
    Task.objects.filter(completed__exact=True).delete()
    return Response("Updated List")



@api_view(['DELETE'])
def clearAll(request):
    tasks=Task.objects.all()
    tasks.delete()
    return Response(" List Cleared Successfully")