// script.js - Funcionalidades JavaScript para el proyecto

document.addEventListener('DOMContentLoaded', function() {
    console.log('Documento cargado y listo');
    
    // 1. Botón de alerta personalizada
    const btnAlerta = document.getElementById('btn-alerta');
    if (btnAlerta) {
        btnAlerta.addEventListener('click', function() {
            // Crear alerta personalizada con Bootstrap
            const alertPlaceholder = document.createElement('div');
            alertPlaceholder.innerHTML = `
                <div class="alert alert-info alert-dismissible fade show" role="alert">
                    <h4 class="alert-heading"><i class="bi-info-circle-fill me-2"></i>¡Alerta Personalizada!</h4>
                    <p>Este es un mensaje de alerta generado con JavaScript.</p>
                    <hr>
                    <p class="mb-0">Proyecto desarrollado con Bootstrap y JavaScript.</p>
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                </div>
            `;
            
            // Insertar alerta antes del botón
            btnAlerta.parentNode.insertBefore(alertPlaceholder, btnAlerta.nextSibling);
            
            // Auto-eliminar la alerta después de 5 segundos
            setTimeout(() => {
                const alert = document.querySelector('.alert');
                if (alert) {
                    const bsAlert = new bootstrap.Alert(alert);
                    bsAlert.close();
                }
            }, 5000);
        });
    }
    
    // 2. Validación del formulario de contacto
    const contactForm = document.getElementById('contactForm');
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const mensajeInput = document.getElementById('mensaje');
    const mensajeExito = document.getElementById('mensaje-exito');
    
    // Contador de caracteres para el mensaje
    if (mensajeInput) {
        const contadorCaracteres = document.getElementById('contador-caracteres');
        
        mensajeInput.addEventListener('input', function() {
            const longitud = mensajeInput.value.length;
            contadorCaracteres.textContent = longitud;
            
            // Cambiar color según la longitud
            if (longitud > 400) {
                contadorCaracteres.style.color = 'var(--color-danger)';
            } else if (longitud > 300) {
                contadorCaracteres.style.color = 'var(--color-warning)';
            } else {
                contadorCaracteres.style.color = 'var(--color-primary)';
            }
        });
        
        // Inicializar contador
        contadorCaracteres.textContent = mensajeInput.value.length;
    }
    
    // Validación en tiempo real para el campo nombre
    if (nombreInput) {
        nombreInput.addEventListener('blur', function() {
            validarCampo(nombreInput, 'nombre', validaNombre);
        });
        
        nombreInput.addEventListener('input', function() {
            // Remover error al empezar a escribir
            if (nombreInput.classList.contains('is-invalid')) {
                nombreInput.classList.remove('is-invalid');
            }
        });
    }
    
    // Validación en tiempo real para el campo email
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            validarCampo(emailInput, 'email', validaEmail);
        });
        
        emailInput.addEventListener('input', function() {
            if (emailInput.classList.contains('is-invalid')) {
                emailInput.classList.remove('is-invalid');
            }
        });
    }
    
    // Validación en tiempo real para el campo mensaje
    if (mensajeInput) {
        mensajeInput.addEventListener('blur', function() {
            validarCampo(mensajeInput, 'mensaje', validaMensaje);
        });
        
        mensajeInput.addEventListener('input', function() {
            if (mensajeInput.classList.contains('is-invalid')) {
                mensajeInput.classList.remove('is-invalid');
            }
        });
    }
    
    // Manejo del envío del formulario
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            // Validar todos los campos
            const nombreValido = validarCampo(nombreInput, 'nombre', validaNombre);
            const emailValido = validarCampo(emailInput, 'email', validaEmail);
            const mensajeValido = validarCampo(mensajeInput, 'mensaje', validaMensaje);
            
            // Si todos los campos son válidos, "enviar" el formulario
            if (nombreValido && emailValido && mensajeValido) {
                // Aquí normalmente se enviaría el formulario a un servidor
                console.log('Formulario válido. Datos:');
                console.log('Nombre:', nombreInput.value);
                console.log('Email:', emailInput.value);
                console.log('Asunto:', document.getElementById('asunto').value);
                console.log('Mensaje:', mensajeInput.value);
                console.log('Newsletter:', document.getElementById('newsletter').checked);
                
                // Mostrar mensaje de éxito
                if (mensajeExito) {
                    mensajeExito.classList.remove('d-none');
                    
                    // Ocultar mensaje después de 5 segundos
                    setTimeout(() => {
                        mensajeExito.classList.add('d-none');
                    }, 5000);
                }
                
                // Resetear formulario
                contactForm.reset();
                
                // Resetear contador de caracteres
                if (contadorCaracteres) {
                    contadorCaracteres.textContent = '0';
                    contadorCaracteres.style.color = 'var(--color-primary)';
                }
                
                // Remover clases de validación
                nombreInput.classList.remove('is-valid');
                emailInput.classList.remove('is-valid');
                mensajeInput.classList.remove('is-valid');
            } else {
                // Mostrar mensaje general de error
                const alertaError = document.createElement('div');
                alertaError.innerHTML = `
                    <div class="alert alert-danger alert-dismissible fade show mt-3" role="alert">
                        <i class="bi-exclamation-triangle-fill me-2"></i>
                        Por favor, corrige los errores en el formulario antes de enviar.
                        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    </div>
                `;
                
                // Insertar alerta antes del formulario
                contactForm.prepend(alertaError);
                
                // Auto-eliminar la alerta después de 5 segundos
                setTimeout(() => {
                    const alert = document.querySelector('.alert-danger');
                    if (alert) {
                        const bsAlert = new bootstrap.Alert(alert);
                        bsAlert.close();
                    }
                }, 5000);
            }
        });
    }
    
    // Funciones de validación
    function validaNombre(nombre) {
        // El nombre debe tener al menos 2 caracteres
        return nombre.trim().length >= 2;
    }
    
    function validaEmail(email) {
        // Expresión regular básica para validar email
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    function validaMensaje(mensaje) {
        // El mensaje debe tener al menos 10 caracteres
        return mensaje.trim().length >= 10;
    }
    
    function validarCampo(input, campoId, funcionValidacion) {
        const valor = input.value.trim();
        const esValido = funcionValidacion(valor);
        const errorElement = document.getElementById(`error-${campoId}`);
        
        if (esValido) {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
            if (errorElement) errorElement.style.display = 'none';
            return true;
        } else {
            input.classList.remove('is-valid');
            input.classList.add('is-invalid');
            if (errorElement) errorElement.style.display = 'block';
            return false;
        }
    }
    
    // 3. Funcionalidad adicional: Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Solo aplicar smooth scroll para enlaces internos (no #)
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70, // Ajustar para el navbar fijo
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // 4. Funcionalidad adicional: Resaltar sección activa en navbar
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = '#' + section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentSectionId) {
                link.classList.add('active');
            }
        });
    });
});