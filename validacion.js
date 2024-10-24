const formularios = document.querySelectorAll('form'); // Selecciona todos los formularios en la página
const inputs = document.querySelectorAll('form input'); // Selecciona todos los inputs en todos los formularios

const validarRutChileno = (ev_rut) => {
    // Eliminar puntos y guion
    let valor = ev_rut.replace(/\./g, '').replace('-', '');

    // Extraer el dígito verificador
    let cuerpo = valor.slice(0, -1);
    let dv = valor.slice(-1).toUpperCase();

    // Validar el cuerpo del RUT (que sea un número)
    if (!cuerpo.match(/^\d+$/)) {
        return false;
    }

    // Calcular el dígito verificador esperado
    let suma = 0;
    let multiplo = 2;

    // Iterar desde el último dígito del cuerpo hasta el primero
    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += multiplo * parseInt(cuerpo.charAt(i));
        multiplo = (multiplo < 7) ? multiplo + 1 : 2;
    }

    let dvEsperado = 11 - (suma % 11);
    dvEsperado = (dvEsperado === 11) ? '0' : (dvEsperado === 10) ? 'K' : dvEsperado.toString();

    // Comparar el dígito verificador calculado con el ingresado
    return dv === dvEsperado;
};

const expresiones = {
    ev_rut:  /^[0-9\-]{8,10}$/,// Numeros, guion
    ev_ficha: /^[0-9]{1,100}$/, // Números.
    ev_piso: /^[a-zA-ZÀ-ÿ\s\0-9]+[a-zA-ZÀ-ÿ\s\0-9]{4,11}$/, // Letras, numeros, espacios
    ev_piso_ambito: /^[a-zA-ZÀ-ÿ\s\0-9]+[a-zA-ZÀ-ÿ\s\0-9]{4,11}$/, // Letras, numeros, espacios
	nombre: /^[a-zA-ZÀ-ÿ\s\u00f1\u00d1]{1,40}$/, // Letras y espacios
    apellido: /^[a-zA-ZÀ-ÿ\s\u00f1\u00d1]+$/, // Letras
	edad: /^[0-9]{1,3}$/, // Números.
	sala: /^[0-9]{1,100}$/, // Números.	
}

const validarFormulario = (e) => {
    switch (e.target.name){
        case "ev_rut":
            validarCampo(validarRutChileno, e.target, 'ev_rut');
        break;
        case "ev_ficha":
            validarCampo(expresiones.ev_ficha, e.target, 'ev_ficha');
        break;
        case "ev_piso":
            validarCampo(expresiones.ev_piso, e.target, 'ev_piso');
        break;
        case "ev_piso_ambito":
            validarCampo(expresiones.ev_piso_ambito, e.target, 'ev_piso_ambito');
        break;
        case "nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre');
        break;
        case "apellido":
            validarCampo(expresiones.apellido, e.target, 'apellido');
        break;
        case "edad":
            validarCampo(expresiones.edad, e.target, 'edad');
        break;
        case "sala":
            validarCampo(expresiones.sala, e.target, 'sala');
        break;
    }
}

const validarCampo = (validacion, input, campo) => {
    let valido = false;

    if (campo === 'ev_rut') {
        valido = validacion(input.value);
    } else {
        valido = validacion.test(input.value);
    }

    if(valido){
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
    }else {
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', () => {

});

