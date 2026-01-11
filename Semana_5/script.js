// Variables globales
let imagenSeleccionada = null;
let contadorImagenes = 0;

// Cuando el documento está listo
document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const galeria = document.getElementById('galeria');
    const inputUrl = document.getElementById('url-imagen');
    const botonAgregar = document.getElementById('boton-agregar');
    const botonEliminar = document.getElementById('boton-eliminar');
    const botonLimpiar = document.getElementById('boton-limpiar');
    const contador = document.getElementById('contador');
    const mensajeVacia = document.getElementById('mensaje-vacia');
    
    // Cargar imágenes de ejemplo
    cargarImagenesEjemplo();
    
    // Evento para agregar imagen con botón
    botonAgregar.addEventListener('click', agregarImagen);
    
    // Evento para agregar imagen con Enter
    inputUrl.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            agregarImagen();
        }
    });
    
    // Evento para eliminar imagen seleccionada
    botonEliminar.addEventListener('click', eliminarImagenSeleccionada);
    
    // Evento para limpiar toda la galería
    botonLimpiar.addEventListener('click', limpiarGaleria);
    
    // Evento para eliminar con tecla SUPR
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Delete' && imagenSeleccionada) {
            eliminarImagenSeleccionada();
        }
    });
    
    // Función para agregar imagen
    function agregarImagen() {
        const url = inputUrl.value.trim();
        
        if (!url) {
            alert('Por favor, ingresa una URL de imagen');
            inputUrl.focus();
            return;
        }
        
        // Validar si es URL o ruta local
        const esUrlValida = validarURL(url) || url.startsWith('assets/');
        
        if (!esUrlValida) {
            alert('La URL no es válida. Debe comenzar con http://, https:// o assets/');
            return;
        }
        
        // Crear elemento de imagen
        const imagen = document.createElement('img');
        imagen.src = url;
        imagen.alt = `Imagen ${contadorImagenes + 1}`;
        
        // Manejar error si la imagen no carga
        imagen.onerror = function() {
            this.src = 'https://via.placeholder.com/300x200?text=Error+al+cargar';
            alert('No se pudo cargar la imagen. Se usará una imagen de reemplazo.');
        };
        
        // Crear contenedor de la imagen
        const item = document.createElement('div');
        item.className = 'item-galeria';
        contadorImagenes++;
        item.dataset.id = contadorImagenes;
        
        // Crear información de la imagen
        const info = document.createElement('div');
        info.className = 'info-imagen';
        
        const texto = document.createElement('p');
        texto.textContent = `Imagen ${contadorImagenes}: ${url.substring(0, 40)}${url.length > 40 ? '...' : ''}`;
        
        info.appendChild(texto);
        
        // Agregar elementos al contenedor
        item.appendChild(imagen);
        item.appendChild(info);
        
        // Evento para seleccionar la imagen
        item.addEventListener('click', function() {
            seleccionarImagen(item);
        });
        
        // Agregar a la galería
        galeria.appendChild(item);
        
        // Limpiar input
        inputUrl.value = '';
        inputUrl.focus();
        
        // Ocultar mensaje de galería vacía
        mensajeVacia.style.display = 'none';
        
        // Mostrar mensaje de éxito
        console.log('Imagen agregada correctamente');
    }
    
    // Función para seleccionar imagen
    function seleccionarImagen(item) {
        // Si ya está seleccionada, deseleccionar
        if (imagenSeleccionada === item) {
            item.classList.remove('seleccionada');
            imagenSeleccionada = null;
            contador.textContent = '0';
            botonEliminar.disabled = true;
            return;
        }
        
        // Quitar selección anterior
        if (imagenSeleccionada) {
            imagenSeleccionada.classList.remove('seleccionada');
        }
        
        // Seleccionar nueva imagen
        item.classList.add('seleccionada');
        imagenSeleccionada = item;
        contador.textContent = '1';
        botonEliminar.disabled = false;
    }
    
    // Función para eliminar imagen seleccionada
    function eliminarImagenSeleccionada() {
        if (!imagenSeleccionada) return;
        
        // Animación de desaparición
        imagenSeleccionada.classList.add('desapareciendo');
        
        // Eliminar después de la animación
        setTimeout(() => {
            imagenSeleccionada.remove();
            imagenSeleccionada = null;
            contador.textContent = '0';
            botonEliminar.disabled = true;
            
            // Mostrar mensaje si la galería queda vacía
            if (galeria.children.length === 0) {
                mensajeVacia.style.display = 'block';
            }
            
            alert('Imagen eliminada correctamente');
        }, 300);
    }
    
    // Función para limpiar toda la galería
    function limpiarGaleria() {
        if (galeria.children.length === 0) {
            alert('La galería ya está vacía');
            return;
        }
        
        const confirmar = confirm('¿Estás seguro de que quieres eliminar todas las imágenes?');
        
        if (confirmar) {
            // Animar la eliminación de todas
            const items = Array.from(galeria.children);
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('desapareciendo');
                }, index * 50);
            });
            
            // Eliminar todas después de la animación
            setTimeout(() => {
                galeria.innerHTML = '';
                imagenSeleccionada = null;
                contador.textContent = '0';
                botonEliminar.disabled = true;
                mensajeVacia.style.display = 'block';
                alert('Galería limpiada correctamente');
            }, items.length * 50 + 300);
        }
    }
    
    // Función para cargar imágenes de ejemplo
    function cargarImagenesEjemplo() {
        // URLs de ejemplo (usamos Lorem Picsum para imágenes aleatorias)
        const ejemplos = [
            'https://picsum.photos/300/200?random=1',
            'https://picsum.photos/300/200?random=2',
            'https://picsum.photos/300/200?random=3',
            'https://picsum.photos/300/200?random=4'
        ];
        
        // Agregar cada imagen de ejemplo
        ejemplos.forEach(url => {
            inputUrl.value = url;
            agregarImagen();
        });
        
        // Limpiar el input después de agregar ejemplos
        inputUrl.value = '';
    }
    
    // Función para validar URL
    function validarURL(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }
});