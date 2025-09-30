from rest_framework.routers import DefaultRouter
from .views import ContactoViewSet

router = DefaultRouter()
router.register('contactos', ContactoViewSet, basename='contactos')

urlpatterns = router.urls
