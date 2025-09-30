from rest_framework.routers import DefaultRouter
from .views import ContactoViewSet

# Router DRF: crea automáticamente /contactos/ para el ViewSet.
router = DefaultRouter()
router.register('contactos', ContactoViewSet, basename='contactos')

# Estas son las URL que incluirá el proyecto en /api/
urlpatterns = router.urls
