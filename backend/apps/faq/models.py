from django.db import models


class FAQ(models.Model):
    question   = models.CharField(max_length=200)
    answer     = models.TextField(blank=True)          # la respondes luego
    email      = models.EmailField(blank=True)         # opcional para contacto
    is_public  = models.BooleanField(default=False)     # sólo publicadas se muestran
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.question[:60]
