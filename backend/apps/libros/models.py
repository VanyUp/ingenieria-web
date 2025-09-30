from django.db import models
from django.utils.text import slugify

class Libro(models.Model):
    # básico
    title       = models.CharField(max_length=160)
    slug        = models.SlugField(max_length=180, unique=True, blank=True)
    author      = models.CharField(max_length=120, blank=True)
    cover       = models.ImageField(upload_to='libros_covers/', blank=True, null=True)
    
    

    # contenido
    summary     = models.CharField("Resumen corto", max_length=220)
    description = models.TextField("Descripción / reseña", max_length=4000)

    # taxonomía / metadatos
    keywords    = models.CharField("Palabras clave (coma)", max_length=240, blank=True)
    pages       = models.PositiveIntegerField(default=0, blank=True)
    published_at= models.DateField("Fecha publicación", blank=True, null=True)
    is_featured = models.BooleanField("Destacado", default=False)

    # housekeeping
    created_at  = models.DateTimeField(auto_now_add=True)
    updated_at  = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-is_featured', '-created_at']

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)[:170]
        super().save(*args, **kwargs)

    def keywords_list(self):
        return [k.strip() for k in self.keywords.split(',') if k.strip()]
