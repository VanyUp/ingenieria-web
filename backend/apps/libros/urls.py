from django.urls import path
from . import views

urlpatterns = [
    path('open/', views.open_list, name='open'),
    path('', views.open_list, name='open_list'),
    path('open/<slug:slug>/', views.book_detail, name='book_detail'),
]
