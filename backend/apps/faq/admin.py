
from django.contrib import admin
from .models import FAQ

@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ("question", "is_public", "created_at")
    list_filter  = ("is_public", "created_at")
    search_fields = ("question", "answer", "email")
