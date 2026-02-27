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

/* --- LÓGICA DEL CAROUSEL --- */

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

/**
 * Muestra un slide específico basado en su índice
 */
function showSlide(index) {
    // 1. Quitamos la clase 'active' de la imagen actual
    slides[currentSlide].classList.remove('active');
    
    // 2. Calculamos el nuevo índice
    // (slides.length ayuda a que si estamos en la última, vuelva a la primera)
    currentSlide = (index + slides.length) % slides.length;
    
    // 3. Mostramos la nueva imagen
    slides[currentSlide].classList.add('active');
}

/**
 * Función que llaman los botones 'prev' y 'next'
 */
function changeSlide(direction) {
    showSlide(currentSlide + direction);
}

/**
 * Cambio automático: cambia de slide cada 5 segundos
 */
let autoPlay = setInterval(() => {
    changeSlide(1);
}, 5000);

// Opcional: Pausar el autoplay cuando el usuario hace clic en una flecha
// para que no se cambie la imagen bruscamente mientras interactúa.
const controls = document.querySelectorAll('.prev, .next');
controls.forEach(control => {
    control.addEventListener('click', () => {
        clearInterval(autoPlay);
        autoPlay = setInterval(() => { changeSlide(1); }, 5000);
    });
});