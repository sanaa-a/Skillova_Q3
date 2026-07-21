from django.db import models

class Registration(models.Model):
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)  # In real app, use hashed password
    age = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email