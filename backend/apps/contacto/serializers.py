from rest_framework import serializers
from .models import Contacto

# Traduce entre JSON <-> instancia de Contacto y aplica validaciones.
class ContactoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contacto
        fields = ['id','name','surname','email','celular','message','created_at']
        read_only_fields = ['created_at']
