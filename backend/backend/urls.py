from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("apps.portafolio.urls")),  # página inicial
    # Rutas de páginas
    path("contacto/", include("apps.contacto.urls_page")),  # template del formulario
    # Rutas de API
    path("api/", include("apps.contacto.urls_api")),  # API REST

    path("fyq/", include("apps.faq.urls")),   # /fyq/

    path('', include('apps.libros.urls')),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
