$(document).ready(function () {
    // Configuración para la validación del RUT
    const rutOptions = {
        validateOn: 'blur',
        formatOn: 'blur',
        useThousandsSeparator: true,
        minimumLength: 2
    };

    // Elimina puntos y guion del RUT
    const clearFormat = (value) => value.replace(/[\.\-]/g, "");

    // Aplica el formato al RUT (con puntos y guion)
    const formatRut = (value, useThousandsSeparator = true) => {
        let [cRut, cDv] = splitRutAndDv(value);
        if (!cRut || !cDv) return value;

        let rutFormatted = "";
        const thousandsSeparator = useThousandsSeparator ? "." : "";
        while (cRut.length > 3) {
            rutFormatted = thousandsSeparator + cRut.slice(-3) + rutFormatted;
            cRut = cRut.slice(0, -3);
        }
        return cRut + rutFormatted + "-" + cDv;
    };

    // Divide el RUT en cuerpo y dígito verificador
    const splitRutAndDv = (rut) => {
        const cValue = clearFormat(rut);
        if (cValue.length < rutOptions.minimumLength) return [null, null];
        const cDv = cValue.slice(-1).toUpperCase();
        const cRut = cValue.slice(0, -1);
        return [cRut, cDv];
    };

    // Calcula el dígito verificador
    const computeDv = (rut) => {
        let suma = 0;
        let multiplo = 2;
        for (let i = rut.length - 1; i >= 0; i--) {
            suma += multiplo * parseInt(rut.charAt(i));
            multiplo = multiplo < 7 ? multiplo + 1 : 2;
        }
        const dv = 11 - (suma % 11);
        return dv === 11 ? '0' : dv === 10 ? 'K' : dv.toString();
    };

    // Valida el RUT
    const validarRutChileno = (rut) => {
        const [cRut, cDv] = splitRutAndDv(rut);
        if (!cRut || isNaN(cRut)) return false;
        return computeDv(cRut) === cDv;
    };

    // Activar validación del RUT
    $("#ev_rut").on(rutOptions.formatOn, function () {
        $(this).val(formatRut($(this).val(), rutOptions.useThousandsSeparator));
    });

    $("#ev_rut").on(rutOptions.validateOn, function () {
        const $grupoCampo = $("#grupo__ev_rut");
        const $errorMsg = $grupoCampo.find(".formulario__input-error");

        if (validarRutChileno($(this).val())) {
            $grupoCampo.removeClass("formulario__grupo-incorrecto").addClass("formulario__grupo-correcto");
            $grupoCampo.find("i").addClass("fa-check-circle").removeClass("fa-times-circle");
            $errorMsg.removeClass("formulario__input-error-activo");
        } else {
            $grupoCampo.addClass("formulario__grupo-incorrecto").removeClass("formulario__grupo-correcto");
            $grupoCampo.find("i").addClass("fa-times-circle").removeClass("fa-check-circle");
            $errorMsg.addClass("formulario__input-error-activo");
        }
    });

    // Expresiones regulares para validar el resto de campos
    const expresionesEventos = {
        ev_ficha: /^[0-9]{1,2}$/ // Solo números
    };

    // Validación de campos con expresiones regulares
    const validarCampo = (expresion, $input, campo) => {
        const valido = expresion.test($input.val());
        const $grupoCampo = $(`#grupo__${campo}`);

        if (valido) {
            $grupoCampo.removeClass("formulario__grupo-incorrecto").addClass("formulario__grupo-correcto");
            $grupoCampo.find("i").addClass("fa-check-circle").removeClass("fa-times-circle");
            $grupoCampo.find(".formulario__input-error").removeClass("formulario__input-error-activo");
        } else {
            $grupoCampo.addClass("formulario__grupo-incorrecto").removeClass("formulario__grupo-correcto");
            $grupoCampo.find("i").addClass("fa-times-circle").removeClass("fa-check-circle");
            $grupoCampo.find(".formulario__input-error").addClass("formulario__input-error-activo");
        }

        return valido;
    };

    // Validar los campos del formulario dinámicamente
    $("#eventos_adversos input").on("keyup blur", function () {
        const campo = $(this).attr("name");

        if (expresionesEventos[campo]) {
            validarCampo(expresionesEventos[campo], $(this), campo);
        }
    });

    // Validar al enviar el formulario
    $("#eventos_adversos").on("submit", function (e) {
        e.preventDefault();

        let formularioValido = true;

        // Validar cada campo con expresiones regulares
        $("#eventos_adversos input").each(function () {
            const campo = $(this).attr("name");
            if (expresionesEventos[campo]) {
                const esValido = validarCampo(expresionesEventos[campo], $(this), campo);
                formularioValido = formularioValido && esValido;
            }
        });

        // Validar RUT
        const rutValido = validarRutChileno($("#ev_rut").val());
        formularioValido = formularioValido && rutValido;

        if (formularioValido) {
            console.log("Formulario de eventos adversos enviado con éxito");
            this.submit(); // Enviar formulario
        } else {
            console.log("Formulario inválido, revisa los campos.");
        }
    });
});
