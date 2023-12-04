from django.db import models

class Note(models.Model):
    text = models.TextField()
    time = models.DateTimeField(auto_now_add=True)
    color = models.CharField(max_length=20)  

    def __str__(self):
        return f"Note {self.id} - {self.text}"

