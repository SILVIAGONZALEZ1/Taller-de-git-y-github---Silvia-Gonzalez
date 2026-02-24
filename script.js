document.addEventListener('DOMContentLoaded', () => {
    
    // ---------------------------------------------------------
    // 1. MENU HAMBURGUESA (Móvil)
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
    // 2. EFECTO SCROLL FADE-IN
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
    // 3. VALIDACIÓN DEL FORMULARIO (Solo en la página de inicio)
    // ---------------------------------------------------------
    const form = document.getElementById('orderForm');
    
    // El "if (form)" es la clave: solo ejecuta esto si encuentra el formulario
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); 
            const nombre = document.getElementById('nombre').value;
            const sabor = document.getElementById('sabor').value;

            if(nombre.length < 2) {
                alert("Por favor, ingresa un nombre válido.");
                return;
            }

            alert(`¡Gracias ${nombre}! Hemos recibido tu consulta por la torta de ${sabor}. Nos pondremos en contacto pronto.`);
            form.reset();
        });
    }

    // ---------------------------------------------------------
    // 4. ACORDEONES (Solo en la página de precios)
    // ---------------------------------------------------------
    const accordions = document.querySelectorAll('.accordion-btn');

    if (accordions.length > 0) {
        accordions.forEach(acc => {
            acc.addEventListener('click', function() {
                // Alternar clase active
                this.classList.toggle('active');

                // Seleccionar el panel siguiente
                const panel = this.nextElementSibling;

                // Abrir o cerrar
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                }
            });
        });
    }
   // ---------------------------------------------------------
    // 5. MODAL DE IMÁGENES (LIGHTBOX) - CLIC EN TODA LA FILA
    // ---------------------------------------------------------
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("expandedImg");
    const captionText = document.getElementById("caption");
    const interactiveRows = document.querySelectorAll(".interactive-row"); // Ahora seleccionamos las filas
    const spanClose = document.querySelector(".close-modal");

    if (modal && interactiveRows.length > 0) {
        
        // Al hacer clic en cualquier fila interactiva...
        interactiveRows.forEach(row => {
            row.addEventListener('click', function(e) {
                e.stopPropagation(); 
                
                // Buscamos la imagen que está dentro de ESTA fila específica
                const thumbnailImg = this.querySelector('.row-thumbnail');
                
                // Si la fila tiene una imagen, abrimos el modal
                if (thumbnailImg) {
                    modal.style.display = "flex";
                    setTimeout(() => modal.classList.add('show'), 10);
                    
                    // Copiamos la ruta y el texto de esa imagen
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