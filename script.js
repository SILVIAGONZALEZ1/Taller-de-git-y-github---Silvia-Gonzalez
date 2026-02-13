// Scroll suave
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document
      .querySelector(this.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
  });
});

// Validación simple del formulario
const form = document.getElementById("contactForm");
const message = document.getElementById("formMessage");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  message.textContent = "¡Gracias por tu mensaje! Te responderemos pronto 💕";
  message.style.color = "green";
  form.reset();
});

// FAQ: ocultar respuestas y añadir toggle a cada pregunta
document.querySelectorAll('.faq-answer').forEach((ans) => {
  ans.style.display = 'none';
});

document.querySelectorAll('.faq-question').forEach((btn) => {
  btn.setAttribute('aria-expanded', 'false');
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    const isOpen = answer.style.display === 'block';
    answer.style.display = isOpen ? 'none' : 'block';
    btn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
  });
});
