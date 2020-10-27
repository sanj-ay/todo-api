from django.db import models

# Create your models here.
class Task(models.Model):
    text=models.CharField(max_length=25)
    completed=models.BooleanField(default=False,blank=True,null=True)

    def __str__(self):
        return self.text