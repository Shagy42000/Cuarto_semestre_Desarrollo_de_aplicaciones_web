// Elementos del formulario
const nombre = document.getElementById('nombre');
const email = document.getElementById('email');
const pass = document.getElementById('pass');
const pass2 = document.getElementById('pass2');
const edad = document.getElementById('edad');
const btnEnviar = document.getElementById('btnEnviar');
const btnReset = document.getElementById('btnReset');

// Validar en tiempo real
nombre.oninput = validarNombre;
email.oninput = validarEmail;
pass.oninput = validarPass;
pass2.oninput = validarPass2;
edad.oninput = validarEdad;

// Validar nombre
function validarNombre() {
    const val = nombre.value;
    const err = document.getElementById('errNombre');
    
    if (val.length >= 3) {
        nombre.className = 'correcto';
        err.textContent = '';
        return true;
    } else {
        nombre.className = 'error';
        err.textContent = 'Mínimo 3 letras';
        return false;
    }
}

// Validar email
function validarEmail() {
    const val = email.value;
    const err = document.getElementById('errEmail');
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (regex.test(val)) {
        email.className = 'correcto';
        err.textContent = '';
        return true;
    } else {
        email.className = 'error';
        err.textContent = 'Email inválido';
        return false;
    }
}

// Validar contraseña
function validarPass() {
    const val = pass.value;
    const err = document.getElementById('errPass');
    const tieneNumero = /\d/.test(val);
    const tieneEspecial = /[!@#$%^&*]/.test(val);
    
    if (val.length >= 8 && tieneNumero && tieneEspecial) {
        pass.className = 'correcto';
        err.textContent = '';
        validarPass2(); // Re-validar confirmación
        return true;
    } else {
        pass.className = 'error';
        err.textContent = '8+ chars, número y especial (!@#$%^&*)';
        return false;
    }
}

// Validar confirmación
function validarPass2() {
    const val = pass2.value;
    const err = document.getElementById('errPass2');
    
    if (val === pass.value && val !== '') {
        pass2.className = 'correcto';
        err.textContent = '';
        return true;
    } else {
        pass2.className = 'error';
        err.textContent = 'No coincide';
        return false;
    }
}

// Validar edad
function validarEdad() {
    const val = parseInt(edad.value);
    const err = document.getElementById('errEdad');
    
    if (val >= 18) {
        edad.className = 'correcto';
        err.textContent = '';
        return true;
    } else {
        edad.className = 'error';
        err.textContent = 'Debe ser 18+';
        return false;
    }
}

// Revisar si todo está bien
function revisarTodo() {
    const todoOk = validarNombre() && 
                   validarEmail() && 
                   validarPass() && 
                   validarPass2() && 
                   validarEdad();
    
    btnEnviar.disabled = !todoOk;
}

// Cada validación llama a revisarTodo
nombre.oninput = function() { validarNombre(); revisarTodo(); };
email.oninput = function() { validarEmail(); revisarTodo(); };
pass.oninput = function() { validarPass(); revisarTodo(); };
pass2.oninput = function() { validarPass2(); revisarTodo(); };
edad.oninput = function() { validarEdad(); revisarTodo(); };

// Botón limpiar
btnReset.onclick = function() {
    nombre.value = email.value = pass.value = pass2.value = edad.value = '';
    nombre.className = email.className = pass.className = pass2.className = edad.className = '';
    document.querySelectorAll('.error').forEach(e => e.textContent = '');
    btnEnviar.disabled = true;
};

// Enviar formulario
document.getElementById('miForm').onsubmit = function(e) {
    e.preventDefault();
    alert('¡Todo correcto! Formulario enviado.');
};