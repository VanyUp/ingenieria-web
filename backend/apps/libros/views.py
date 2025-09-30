from django.shortcuts import render, get_object_or_404
from .models import Libro

def open_list(request):
    libros = list(Libro.objects.all())
    for b in libros:
        b.tags_list = [t.strip() for t in (b.keywords or "").split(",") if t.strip()]
    return render(request, "open.html", {"libros": libros})

def book_detail(request, slug):
    libro = get_object_or_404(Libro, slug=slug)
    tags = [t.strip() for t in (libro.keywords or "").split(",") if t.strip()]
    return render(request, "book_detail.html", {"libro": libro, "tags": tags})
