from django.urls import path, include
from django.views.generic import TemplateView
from . import views

urlpatterns = [
    # Formulario en HTML
    path('', TemplateView.as_view(template_name="contacto.html"), name='contacto'),

    # Endpoint API para guardar (ya lo tienes con DRF)
    path('api/', views.ContactoCreateView.as_view(), name='contacto_api'),
]
