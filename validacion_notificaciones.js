// Selecciona el formulario y todos sus inputs
const formularioNotificaciones = document.querySelector('#notificaciones_caida');
const inputsNotificaciones = formularioNotificaciones.querySelectorAll('input');

// Expresiones para validar campos específicos de notificaciones de caída
const expresionesNotificaciones = {
    nombre: /^[a-zA-ZÀ-ÿ\s\u00f1\u00d1]{1,40}$/, // Solo letras y espacios
    apellido: /^[a-zA-ZÀ-ÿ\s\u00f1\u00d1]+$/, // Solo letras
    edad: /^[0-9]{1,2}$/, // Solo números
    sala: /^[0-9]{1,2}$/, // Solo números
};

// Función de validación específica para notificaciones de caída
const validarFormularioNotificaciones = (e) => {
    switch (e.target.name) {
        case "nombre":
            validarCampo(expresionesNotificaciones.nombre, e.target, 'nombre');
            break;
        case "apellido":
            validarCampo(expresionesNotificaciones.apellido, e.target, 'apellido');
            break;
        case "edad":
            validarCampo(expresionesNotificaciones.edad, e.target, 'edad');
            break;
        case "sala":
            validarCampo(expresionesNotificaciones.sala, e.target, 'sala');
            break;
    }
};

// Función para validar los campos de texto y numéricos
const validarCampo = (expresion, input, campo) => {
    const valido = expresion.test(input.value);
    const grupoCampo = document.getElementById(`grupo__${campo}`);
    
    if (valido) {
        grupoCampo.classList.remove('formulario__grupo-incorrecto');
        grupoCampo.classList.add('formulario__grupo-correcto');
        grupoCampo.querySelector('i').classList.add('fa-check-circle');
        grupoCampo.querySelector('i').classList.remove('fa-times-circle');
        grupoCampo.querySelector('.formulario__input-error').classList.remove('formulario__input-error-activo');
    } else {
        grupoCampo.classList.add('formulario__grupo-incorrecto');
        grupoCampo.classList.remove('formulario__grupo-correcto');
        grupoCampo.querySelector('i').classList.add('fa-times-circle');
        grupoCampo.querySelector('i').classList.remove('fa-check-circle');
        grupoCampo.querySelector('.formulario__input-error').classList.add('formulario__input-error-activo');
    }
};

// Event listeners para el formulario de notificaciones de caída
inputsNotificaciones.forEach((input) => {
    input.addEventListener('keyup', validarFormularioNotificaciones);
    input.addEventListener('blur', validarFormularioNotificaciones);
});
formularioNotificaciones.addEventListener('submit', (e) => {
    e.preventDefault();
    // Aquí se puede agregar lógica para verificar si todos los campos son válidos antes de enviar
    console.log("Formulario de notificaciones enviado con éxito");
});
