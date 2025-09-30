from django.apps import AppConfig

# Config de la app. El 'name' es el path completo para referenciarla en INSTALLED_APPS.
class ContactoConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.contacto"




