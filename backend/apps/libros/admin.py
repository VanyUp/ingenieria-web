from django.contrib import admin
from .models import Libro

@admin.register(Libro)
class LibroAdmin(admin.ModelAdmin):
    list_display  = ('title', 'author', 'is_featured', 'created_at',)
    list_filter   = ('is_featured',)
    search_fields = ('title', 'author', 'summary', 'description', 'keywords')
    prepopulated_fields = {"slug": ("title",)}
