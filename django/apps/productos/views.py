from rest_framework import generics
from .models import Producto
from .serializers import ProductoSerializer

class ProductoListView(generics.ListAPIView):
    queryset = Producto.objects.all() #select * from productos_producto
    serializer_class = ProductoSerializer