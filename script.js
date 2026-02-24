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
    // 5. MODAL DE IMÁGENES (LIGHTBOX)
    // ---------------------------------------------------------
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("expandedImg");
    const captionText = document.getElementById("caption");
    const thumbnails = document.querySelectorAll(".row-thumbnail");
    const spanClose = document.querySelector(".close-modal");

    // Verificamos que el modal exista en la página actual
    if (modal && thumbnails.length > 0) {
        
        // Al hacer clic en cualquier miniatura...
        thumbnails.forEach(img => {
            img.addEventListener('click', function(e) {
                e.stopPropagation(); // Evita que el clic cierre o abra el acordeón si están superpuestos
                modal.style.display = "flex";
                
                // Pequeño retraso para que la animación CSS funcione bien
                setTimeout(() => modal.classList.add('show'), 10);
                
                // Copiamos la imagen y el texto alternativo
                modalImg.src = this.src;
                captionText.innerHTML = this.alt; 
            });
        });

        // Función para cerrar el modal
        const closeModal = () => {
            modal.classList.remove('show');
            setTimeout(() => modal.style.display = "none", 300); // Espera a que termine la animación
        };

        // Cerrar al tocar la 'X'
        if (spanClose) {
            spanClose.addEventListener('click', closeModal);
        }

        // Cerrar al tocar en la zona oscura fuera de la imagen
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Cerrar al presionar la tecla "Escape" en el teclado
        document.addEventListener('keydown', function(e) {
            if (e.key === "Escape" && modal.classList.contains('show')) {
                closeModal();
            }
        });
    }
});