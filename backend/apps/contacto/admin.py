from django.contrib import admin
from .models import Contacto

# Registrar el modelo para que aparezca en el admin de Django.
admin.site.register(Contacto)
class ContactoAdmin(admin.ModelAdmin):
    # Columnas visibles en la tabla del admin.
    list_display = ('name','surname','email','celular','created_at')
    # Campos por los que se puede buscar en el admin.
    search_fields = ('name','surname','email','celular')

