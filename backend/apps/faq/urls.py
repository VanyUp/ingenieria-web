from django.urls import path
from .views import fyq_page

urlpatterns = [
    path("", fyq_page, name="fyq"),
]
