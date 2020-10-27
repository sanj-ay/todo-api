from django.urls import path
from . import views

urlpatterns=[
    path('',views.apiOverview,name='api-overview'),
    path('task-list',views.taskList,name='task-list'),
    path('create-task',views.createTask,name='create-task'),
    path('delete-task/<str:pk>',views.deleteTask,name='delete-task'),
    path('clearall',views.clearAll,name='clearall')
    
]