from django.urls import path
from . import views

urlpatterns=[
    path('',views.apiOverview,name='api-overview'),
    path('task-list',views.taskList,name='task-list'),
    path('create-task',views.createTask,name='create-task'),
    path('update-task/<str:pk>',views.updateTask,name='update-task'),
    path('delete-task/<str:pk>',views.deleteTask,name='delete-task'),
    path('remove-completed/',views.removeCompleted,name='remove-completed'),
    path('clearall',views.clearAll,name='clearall')
    
]