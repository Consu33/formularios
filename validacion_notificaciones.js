$(document).ready(function () {
    const expresionesNotificaciones = {
        nombre: /^[a-zA-ZÀ-ÿ\s\u00f1\u00d1]{1,40}$/, // Solo letras y espacios
        apellido: /^[a-zA-ZÀ-ÿ\s\u00f1\u00d1]+$/, // Solo letras
        edad: /^[0-9]{1,2}$/, // Solo números
        sala: /^[0-9]{1,2}$/, // Solo números
    };

    // Función para validar los campos
    const validarCampo = (expresion, $input, campo) => {
        const valido = expresion.test($input.val());
        const $grupoCampo = $(`#grupo__${campo}`);
        
        if (valido) {
            $grupoCampo.removeClass('formulario__grupo-incorrecto').addClass('formulario__grupo-correcto');
            $grupoCampo.find('i').addClass('fa-check-circle').removeClass('fa-times-circle');
            $grupoCampo.find('.formulario__input-error').removeClass('formulario__input-error-activo');
        } else {
            $grupoCampo.addClass('formulario__grupo-incorrecto').removeClass('formulario__grupo-correcto');
            $grupoCampo.find('i').addClass('fa-times-circle').removeClass('fa-check-circle');
            $grupoCampo.find('.formulario__input-error').addClass('formulario__input-error-activo');
        }
    };

    // Función de validación específica para notificaciones de caída
    const validarFormularioNotificaciones = (e) => {
        const $input = $(e.target);
        switch ($input.attr('name')) {
            case "nombre":
                validarCampo(expresionesNotificaciones.nombre, $input, 'nombre');
                break;
            case "apellido":
                validarCampo(expresionesNotificaciones.apellido, $input, 'apellido');
                break;
            case "edad":
                validarCampo(expresionesNotificaciones.edad, $input, 'edad');
                break;
            case "sala":
                validarCampo(expresionesNotificaciones.sala, $input, 'sala');
                break;
        }
    };

    // Asignar eventos a los inputs del formulario
    $("#notificaciones_caida input").on("keyup blur", validarFormularioNotificaciones);

    // Evento de envío del formulario
    $("#notificaciones_caida").on("submit", function (e) {
        e.preventDefault();
        let esValido = true;

        // Validar todos los campos necesarios
        const campos = ["nombre", "apellido", "edad", "sala"];
        campos.forEach((campo) => {
            const $input = $(`[name="${campo}"]`);
            const expresion = expresionesNotificaciones[campo];
            if (!expresion.test($input.val())) {
                esValido = false;
                validarCampo(expresion, $input, campo); // Aplicar clase de error si no es válido
            }
        });

        if (esValido) {
            console.log("Formulario de notificaciones enviado con éxito");
            // Aquí puedes enviar el formulario
            this.submit();
        } else {
            console.log("Formulario inválido. Revisa los campos.");
        }
    });
});
