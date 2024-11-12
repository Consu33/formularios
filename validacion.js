const formularios = document.querySelectorAll('form'); // Selecciona todos los formularios en la página
const inputs = document.querySelectorAll('form input'); // Selecciona todos los inputs en todos los formularios

// Configuración de validación y formato para el RUT
const rutOptions = {
    validateOn: 'blur',
    formatOn: 'blur',
    useThousandsSeparator: true,
    minimumLength: 2
};

// Elimina puntos y guion del RUT
function clearFormat(value) {
    return value.replace(/[\.\-]/g, "");
}

// Aplica el formato al RUT (con puntos y guion)
function formatRut(value, useThousandsSeparator = true) {
    let [cRut, cDv] = splitRutAndDv(value);
    if (!cRut || !cDv) return value;

    let rutFormatted = "";
    const thousandsSeparator = useThousandsSeparator ? "." : "";
    while (cRut.length > 3) {
        rutFormatted = thousandsSeparator + cRut.slice(-3) + rutFormatted;
        cRut = cRut.slice(0, -3);
    }
    return cRut + rutFormatted + "-" + cDv;
}

// Divide el RUT en cuerpo y dígito verificador
function splitRutAndDv(rut) {
    const cValue = clearFormat(rut);
    if (cValue.length < rutOptions.minimumLength) return [null, null];
    const cDv = cValue.slice(-1).toUpperCase();
    const cRut = cValue.slice(0, -1);
    return [cRut, cDv];
}

// Calcula el dígito verificador
function computeDv(rut) {
    let suma = 0;
    let multiplo = 2;
    for (let i = rut.length - 1; i >= 0; i--) {
        suma += multiplo * parseInt(rut.charAt(i));
        multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }
    const dv = 11 - (suma % 11);
    return dv === 11 ? '0' : dv === 10 ? 'K' : dv.toString();
}

// Valida el RUT
function validarRutChileno(rut) {
    const [cRut, cDv] = splitRutAndDv(rut);
    if (!cRut || isNaN(cRut)) return false;
    return computeDv(cRut) === cDv;
}

// Aplicar formato y validar el RUT al campo de entrada
function applyRutValidation(inputId) {
    const input = document.getElementById(inputId);
    const errorMsg = document.querySelector("#grupo__ev_rut .formulario__input-error");

    input.addEventListener(rutOptions.formatOn, () => {
        input.value = formatRut(input.value, rutOptions.useThousandsSeparator);
    });

    input.addEventListener(rutOptions.validateOn, () => {
        if (validarRutChileno(input.value)) {
            input.classList.remove("invalid");
            input.classList.add("valid");
            errorMsg.style.display = "none"; // Oculta el mensaje de error
        } else {
            input.classList.remove("valid");
            input.classList.add("invalid");
            errorMsg.style.display = "block"; // Muestra el mensaje de error
        }
    });
}

// Aplicar la validación al campo con id 'ev_rut'
applyRutValidation('ev_rut');


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

formularios.addEventListener('submit', () => {

});

