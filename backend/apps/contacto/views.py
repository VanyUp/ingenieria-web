from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Contacto
from .serializers import ContactoSerializer

# Vista de página (server-side) que entrega el HTML del formulario.
def contacto_page(request):
    # Busca templates/contacto.html (por tu configuración de TEMPLATES['DIRS'])
    return render(request, 'contacto.html')

# API REST para el modelo Contacto. Solo permite crear (POST).
class ContactoViewSet(ModelViewSet):
    queryset = Contacto.objects.all()
    serializer_class = ContactoSerializer
    http_method_names = ['post']  # solo POST
