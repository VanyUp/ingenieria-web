from django.urls import path
from .views import contacto_page
# URL de página (renderiza HTML del formulario)
urlpatterns = [
    path('', contacto_page, name='contacto'),
]
