from django import forms
from .models import FAQ

class QuestionForm(forms.ModelForm):
    # honeypot anti-bots
    hp = forms.CharField(required=False, widget=forms.HiddenInput)

    class Meta:
        model  = FAQ
        fields = ["question", "email"]   # no exponer answer/is_public
        widgets = {
            "question": forms.Textarea(attrs={
                "rows": 3,
                "placeholder": "Escribe tu pregunta…"
            }),
            "email": forms.EmailInput(attrs={
                "placeholder": "Tu correo (opcional)"
            }),
        }
        labels = {
            "question": "Pregunta",
            "email": "Correo (opcional)",
        }
