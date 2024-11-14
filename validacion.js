// Selecciona el formulario y sus inputs
const formularioEventos = document.querySelector('#eventos_adversos');
const inputsEventos = formularioEventos.querySelectorAll('input');

// Configuración para la validación del RUT
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

// Aplica el formato y valida el RUT al campo de entrada
function applyRutValidation() {
    const inputRut = document.getElementById("ev_rut");
    const errorMsg = document.querySelector("#grupo__ev_rut .formulario__input-error");

    inputRut.addEventListener(rutOptions.formatOn, () => {
        inputRut.value = formatRut(inputRut.value, rutOptions.useThousandsSeparator);
    });

    inputRut.addEventListener(rutOptions.validateOn, () => {
        if (validarRutChileno(inputRut.value)) {
            inputRut.classList.remove("invalid");
            inputRut.classList.add("valid");
            errorMsg.style.display = "none";
        } else {
            inputRut.classList.remove("valid");
            inputRut.classList.add("invalid");
            errorMsg.style.display = "block";
        }
    });
}

// Llama a la función para activar la validación en el RUT
applyRutValidation();

// Expresiones regulares para validar el resto de campos
const expresionesEventos = {
    ev_ficha: /^[0-9]{1,2}$/, // Solo números
};

// Validación de los campos en el formulario de eventos
const validarFormularioEventos = (e) => {
    switch (e.target.name) {
        case "ev_ficha":
            validarCampo(expresionesEventos.ev_ficha, e.target, 'ev_ficha');
            break;
    }
};

// Función general para validar un campo
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

// Event listeners para los campos del formulario de eventos
inputsEventos.forEach((input) => {
    input.addEventListener('keyup', validarFormularioEventos);
    input.addEventListener('blur', validarFormularioEventos);
});
formularioEventos.addEventListener('submit', (e) => {
    e.preventDefault();
    // Lógica adicional para el envío del formulario
    console.log("Formulario de eventos adversos enviado con éxito");
});
