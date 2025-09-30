document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".faq-item");

  items.forEach(item => {
    const question = item.querySelector(".faq-q");

    question.addEventListener("click", () => {
      // cerrar los demás
      items.forEach(i => {
        if (i !== item) i.classList.remove("active");
      });

      // toggle actual
      item.classList.toggle("active");
    });
  });
});
