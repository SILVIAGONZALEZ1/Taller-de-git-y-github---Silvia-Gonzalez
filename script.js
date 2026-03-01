document.addEventListener('DOMContentLoaded', () => {

    // ---------------------------------------------------------
    // 1. SCROLL SUAVE
    // ---------------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            if (targetId !== "#") { // Evita errores si el href es solo "#"
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: "smooth" });
                }
            }
        });
    });

    // ---------------------------------------------------------
    // 2. VALIDACIÓN SIMPLE DEL FORMULARIO (Contacto general)
    // ---------------------------------------------------------
    const contactForm = document.getElementById("contactForm"); // Nombre cambiado a contactForm
    const message = document.getElementById("formMessage");

    if (contactForm && message) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();
            message.textContent = "¡Gracias por tu mensaje! Te responderemos pronto 💕";
            message.style.color = "green";
            contactForm.reset();
        });
    }

    // ---------------------------------------------------------
    // 3. FAQ (Preguntas Frecuentes)
    // ---------------------------------------------------------
    document.querySelectorAll('.faq-answer').forEach((ans) => {
        ans.style.display = 'block';
    });

    document.querySelectorAll('.faq-question').forEach((btn) => {
        btn.setAttribute('aria-expanded', 'true');
        btn.addEventListener('click', () => {
            const answer = btn.nextElementSibling;
            if (answer) {
                const isOpen = answer.style.display === 'block';
                answer.style.display = isOpen ? 'none' : 'block';
                btn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
            }
        });
    });

    // ---------------------------------------------------------
    // 4. LÓGICA DEL CAROUSEL (Estructura corregida)
    // ---------------------------------------------------------
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');

    function showSlide(index) {
        // Solo ejecuta si hay slides en la página actual
        if (slides.length > 0) {
            slides[currentSlide].classList.remove('active');
            
            // Aquí deberías agregar la lógica para el nuevo slide, por ejemplo:
            // currentSlide = index;
            // slides[currentSlide].classList.add('active');
        }
    } // ¡Esta llave de cierre era la que faltaba!

    // ---------------------------------------------------------
    // 5. MENU HAMBURGUESA (Móvil)
    // ---------------------------------------------------------
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
        });

        document.querySelectorAll('.nav-links li a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('nav-active');
            });
        });
    }

    // ---------------------------------------------------------
    // 6. EFECTO SCROLL FADE-IN
    // ---------------------------------------------------------
    const faders = document.querySelectorAll('.fade-in');
    
    if (faders.length > 0) {
        const appearOptions = {
            threshold: 0.2,
            rootMargin: "0px 0px -50px 0px"
        };

        const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    return;
                } else {
                    entry.target.classList.add('active');
                    appearOnScroll.unobserve(entry.target);
                }
            });
        }, appearOptions);

        faders.forEach(fader => {
            appearOnScroll.observe(fader);
        });
    }

    // ---------------------------------------------------------
    // 7. VALIDACIÓN DEL FORMULARIO (Página de inicio/pedidos)
    // ---------------------------------------------------------
    const orderForm = document.getElementById('orderForm'); // Nombre cambiado a orderForm
    
    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            const nombre = document.getElementById('nombre').value;
            const sabor = document.getElementById('sabor').value;

            if(nombre.length < 2) {
                alert("Por favor, ingresa un nombre válido.");
                return;
            }

            alert(`¡Gracias ${nombre}! Hemos recibido tu consulta por la torta de ${sabor}. Nos pondremos en contacto pronto.`);
            orderForm.reset();
        });
    }

    // ---------------------------------------------------------
    // 8. ACORDEONES (Página de precios)
    // ---------------------------------------------------------
    const accordions = document.querySelectorAll('.accordion-btn');

    if (accordions.length > 0) {
        accordions.forEach(acc => {
            acc.addEventListener('click', function() {
                this.classList.toggle('active');
                const panel = this.nextElementSibling;
                if (panel) {
                    if (panel.style.maxHeight) {
                        panel.style.maxHeight = null;
                    } else {
                        panel.style.maxHeight = panel.scrollHeight + "px";
                    }
                }
            });
        });
    }

    // ---------------------------------------------------------
    // 9. MODAL DE IMÁGENES (LIGHTBOX)
    // ---------------------------------------------------------
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("expandedImg");
    const captionText = document.getElementById("caption");
    const interactiveRows = document.querySelectorAll(".interactive-row");
    const spanClose = document.querySelector(".close-modal");

    if (modal && interactiveRows.length > 0) {
        interactiveRows.forEach(row => {
            row.addEventListener('click', function(e) {
                e.stopPropagation(); 
                const thumbnailImg = this.querySelector('.row-thumbnail');
                
                if (thumbnailImg) {
                    modal.style.display = "flex";
                    setTimeout(() => modal.classList.add('show'), 10);
                    modalImg.src = thumbnailImg.src;
                    captionText.innerHTML = thumbnailImg.alt; 
                }
            });
        });

        const closeModal = () => {
            modal.classList.remove('show');
            setTimeout(() => modal.style.display = "none", 300); 
        };

        if (spanClose) {
            spanClose.addEventListener('click', closeModal);
        }

        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === "Escape" && modal.classList.contains('show')) {
                closeModal();
            }
        });
    }
});