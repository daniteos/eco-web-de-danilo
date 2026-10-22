/* =========================================
   ECOVERDE - FUNCIONES INTERACTIVAS
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // 1. MENÚ PARA TELÉFONOS
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Cerrar menú" : "Abrir menú"
            );
            menuToggle.textContent = isOpen ? "✕" : "☰";
        });

        // Cerrar el menú al seleccionar una sección.
        navLinks.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Abrir menú");
                menuToggle.textContent = "☰";
            });
        });

        // Cerrar el menú si se vuelve a una pantalla grande.
        window.addEventListener("resize", () => {
            if (window.innerWidth > 760) {
                navLinks.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Abrir menú");
                menuToggle.textContent = "☰";
            }
        });
    }

    // 2. ANIMACIÓN DE LOS ELEMENTOS AL DESPLAZARSE
    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries, currentObserver) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        currentObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -35px 0px"
            }
        );

        revealElements.forEach((element) => {
            observer.observe(element);
        });
    } else {
        // Alternativa para navegadores antiguos.
        revealElements.forEach((element) => {
            element.classList.add("visible");
        });
    }

    // 3. AÑO AUTOMÁTICO EN EL PIE DE PÁGINA
    const yearElement = document.getElementById("current-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // 4. FORMULARIO DE CONTACTO
    const contactForm = document.getElementById("contact-form");
    const formNotice = document.getElementById("form-notice");

    if (contactForm && formNotice) {

        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            const formData = new FormData(contactForm);

            const nombre = String(formData.get("nombre") || "").trim();
            const email = String(formData.get("email") || "").trim();
            const asunto = String(formData.get("asunto") || "").trim();
            const mensaje = String(formData.get("mensaje") || "").trim();

            if (!nombre || !email || !asunto || !mensaje) {
                formNotice.textContent =
                    "Por favor, completa todos los campos.";
                return;
            }

            // Cambia esta dirección por el correo real del proyecto.
            const correoDestino = "contacto@tudominio.com";

            const asuntoCorreo = `Consulta EcoVerde: ${asunto}`;

            const cuerpoCorreo = [
                `Nombre: ${nombre}`,
                `Correo: ${email}`,
                `Motivo: ${asunto}`,
                "",
                "Mensaje:",
                mensaje
            ].join("\n");

            const mailtoURL =
                `mailto:${correoDestino}` +
                `?subject=${encodeURIComponent(asuntoCorreo)}` +
                `&body=${encodeURIComponent(cuerpoCorreo)}`;

            formNotice.textContent =
                "Se intentará abrir tu aplicación de correo para preparar el mensaje.";

            // Abre el programa de correo del visitante.
            window.location.href = mailtoURL;
        });
    }

    // 5. EFECTO SUAVE EN LOS ENLACES INTERNOS
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                // Evita que los enlaces sociales vacíos
                // lleven al visitante a una sección inexistente.
                event.preventDefault();
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                    ).matches ? "auto" : "smooth",
                    block: "start"
                });

                history.replaceState(null, "", targetId);
            }
        });
    });

});