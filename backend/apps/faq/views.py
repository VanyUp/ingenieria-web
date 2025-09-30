from django.shortcuts import render, redirect
from django.contrib import messages
from .models import FAQ
from .forms import QuestionForm

def fyq_page(request):
    faqs = FAQ.objects.filter(is_public=True)

    if request.method == "POST":
        form = QuestionForm(request.POST)
        if form.is_valid():
            # honeypot simple
            if form.cleaned_data.get("hp"):
                messages.error(request, "Error de validación.")
                return redirect("fyq")

            form.save()  # crea FAQ sin respuesta ni publicación
            messages.success(request, "¡Recibimos tu pregunta! La revisaremos pronto.")
            return redirect("fyq")
    else:
        form = QuestionForm()

    seed = [
        {"q": "¿Cómo elijo mi próximo libro?",
         "a": "Si me gusta como el autor o la autora escriben, leo libros de ellos para seguir con el tipo narración si quiero cambiar de estilo, me guío por la portada de los libros."},
        {"q": "¿Dónde tomas notas de lectura?",
         "a": "Cuando leo en físico no me gusta escribir o rayar en los libros, cuando leo en digital desde el Iphone hago mis anotaciones."},
    ]

    return render(request, "fyq.html", {
        "faq_list": faqs,
        "form": form,
        "seed": seed,
    })
