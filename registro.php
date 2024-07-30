<?php

require 'vendor/autoload.php'; // Autoload de Composer

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Datos del servidor
$servidor = "localhost";
$usuario = "root";
$contraseña = "";
$baseDeDatos = "formularios";

$conexion = new mysqli($servidor, $usuario, $contraseña, $baseDeDatos);

if ($conexion->connect_errno) {
    die("Conexión fallida: " . $conexion->connect_errno);
}

// Función para enviar correo para evento adverso
function enviarCorreoEventoAdverso($ev_rut, $ev_ficha, $ev_fecha_ea, $ev_servicio, $ev_piso, $ev_ambito, $ev_piso_ambito, $ev_reportar, $ev_descripcion, $ev_acciones, $ev_daño, $ev_notificacion) {
    $mail = new PHPMailer(true);
    try {
        // Configuración del servidor de correo
        $mail->isSMTP();
        $mail->Host = 'smtp.office365.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'manuel.arrano@redsalud.gob.cl';
        $mail->Password = 'Jar46967'; // Cambia esta contraseña por la correcta
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        $mail->setFrom('manuel.arrano@redsalud.gob.cl');
        $mail->addAddress('manuel.arrano@redsalud.gob.cl', 'manuel');

        // Contenido del correo
        $mail->isHTML(true);
        $mail->CharSet = "UTF-8";
        $mail->Subject = "Evento Adverso";
        $mail->Body = "Datos del evento adverso:<br>";
        $mail->Body .= "RUT: $ev_rut<br>";
        $mail->Body .= "Ficha: $ev_ficha<br>";
        $mail->Body .= "Fecha: $ev_fecha_ea<br>";
        $mail->Body .= "Servicio: $ev_servicio<br>";
        $mail->Body .= "Piso: $ev_piso<br>";
        $mail->Body .= "Ámbito: $ev_ambito<br>";
        $mail->Body .= "Piso/Ambito: $ev_piso_ambito<br>";
        $mail->Body .= "Reportar: $ev_reportar<br>";
        $mail->Body .= "Descripción: $ev_descripcion<br>";
        $mail->Body .= "Acciones: $ev_acciones<br>";
        $mail->Body .= "Daño: $ev_daño<br>";
        $mail->Body .= "Notificación: $ev_notificacion<br>";

        $mail->send();
        echo 'Correo enviado';
    } catch (Exception $e) {
        echo 'Mensaje: ' . $mail->ErrorInfo;
    }
}

// Función para enviar correo para notificación de caída
function enviarCorreoNotificacionCaida($nombre, $apellido, $sexo, $edad, $diagnostico_ingreso, $servicio_clinico, $sala, $hora_caida, $dia_caida, $lesiones, $ubicacion_lesion, $descripcion_caida, $sitio_caida, $equipo_mobiliario, $otro_equipo, $entorno, $actividad, $medicamentos_paciente, $estado_paciente, $observaciones) {
    $mail = new PHPMailer(true);
    try {
        // Configuración del servidor de correo
        $mail->isSMTP();
        $mail->Host = 'smtp.office365.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'manuel.arrano@redsalud.gob.cl';
        $mail->Password = 'Jar46967'; // Cambia esta contraseña por la correcta
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        $mail->setFrom('manuel.arrano@redsalud.gob.cl');
        $mail->addAddress('manuel.arrano@redsalud.gob.cl', 'manuel');

        // Contenido del correo
        $mail->isHTML(true);
        $mail->CharSet = "UTF-8";
        $mail->Subject = "Notificación de Caída";
        $mail->Body = "Datos del paciente:<br>";
        $mail->Body .= "Nombre: $nombre<br>";
        $mail->Body .= "Apellido: $apellido<br>";
        $mail->Body .= "Sexo: $sexo<br>";
        $mail->Body .= "Edad: $edad<br>";
        $mail->Body .= "Diagnóstico: $diagnostico_ingreso<br>";
        $mail->Body .= "Servicio clínico: $servicio_clinico<br>";
        $mail->Body .= "Hora caída: $hora_caida<br>";
        $mail->Body .= "Día caída: $dia_caida<br>";
        $mail->Body .= "Sala: $sala<br>";
        $mail->Body .= "Lesiones: $lesiones<br>";
        $mail->Body .= "Ubicación lesión: $ubicacion_lesion<br>";
        $mail->Body .= "Descripción caída: $descripcion_caida<br>";
        $mail->Body .= "Sitio: $sitio_caida<br>";
        $mail->Body .= "Equipo: $equipo_mobiliario<br>";
        $mail->Body .= "Otro equipo: $otro_equipo<br>";
        $mail->Body .= "Entorno: $entorno<br>";
        $mail->Body .= "Actividad: $actividad<br>";
        $mail->Body .= "Medicamentos: $medicamentos_paciente<br>";
        $mail->Body .= "Estado paciente: $estado_paciente<br>";
        $mail->Body .= "Observaciones: $observaciones<br>";

        $mail->send();
        echo 'Correo enviado';
    } catch (Exception $e) {
        echo 'Mensaje: ' . $mail->ErrorInfo;
    }
}

$formulario = $_POST['formulario'] ?? '';

// Declaración variables tabla evento_adversos
if ($formulario === "eventos_adversos") {
    // Declaración de variables de la tabla eventos_adversos
    $ev_rut = $_POST['ev_rut'] ?? '';
    $ev_ficha = $_POST['ev_ficha'] ?? '';
    $ev_fecha_ea = $_POST['ev_fecha_ea'];
    $ev_servicio = $_POST['ev_servicio'] ?? '';
    $ev_piso = $_POST['ev_piso'] ?? '';
    $ev_ambito = $_POST['ev_ambito'] ?? '';
    $ev_piso_ambito = $_POST['ev_piso_ambito'] ?? '';
    $ev_reportar = $_POST['ev_reportar'] ?? '';
    $ev_descripcion = $_POST['ev_descripcion'] ?? '';
    $ev_acciones = $_POST['ev_acciones'] ?? '';
    $ev_daño = $_POST['ev_daño'] ?? '';
    $ev_notificacion = $_POST['ev_notificacion'] ?? '';

    // Consulta para la tabla eventos_adversos
    $consulta_evento = $conexion->prepare("INSERT INTO evento_adversos (ev_rut, ev_ficha, ev_fecha_ea, ev_servicio, ev_piso, ev_ambito, ev_piso_ambito, ev_reportar, ev_descripcion, ev_acciones, ev_daño, ev_notificacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

    $consulta_evento->bind_param("ssssssssssss", $ev_rut, $ev_ficha, $ev_fecha_ea, $ev_servicio, $ev_piso, $ev_ambito, $ev_piso_ambito, $ev_reportar, $ev_descripcion, $ev_acciones, $ev_daño, $ev_notificacion);

    if ($consulta_evento->execute()) {
        echo "Datos de evento_adversos insertados correctamente.";
    } else {
        echo "Error al insertar datos en evento_adversos: " . $consulta_evento->error;
    }

    $consulta_evento->close();

    enviarCorreoEventoAdverso($ev_rut, $ev_ficha, $ev_fecha_ea, $ev_servicio, $ev_piso, $ev_ambito, $ev_piso_ambito, $ev_reportar, $ev_descripcion, $ev_acciones, $ev_daño, $ev_notificacion);

} elseif ($formulario === "notificaciones_caida") {
    // Declaración de variables de la tabla notificaciones_caida
    $nombre = $_POST['nombre'] ?? '';
    $apellido = $_POST['apellido'] ?? '';
    $sexo = $_POST['sexo'] ?? ''; // "Hombre o Mujer"
    $edad = $_POST['edad'] ?? '';
    $diagnostico_ingreso = $_POST['diagnostico_ingreso'] ?? '';
    $servicio_clinico = $_POST['servicio_clinico'] ?? '';
    $sala = $_POST['sala'] ?? '';
    $hora_caida = $_POST['hora_caida'] ?? '';
    $dia_caida = $_POST['dia_caida'] ?? '';
    $lesiones = isset($_POST['lesiones']) ? implode(', ', $_POST['lesiones']) : '';
    $ubicacion_lesion = $_POST['ubicacion_lesion'] ?? '';
    $descripcion_caida = $_POST['descripcion_caida'] ?? '';
    $sitio_caida = isset($_POST['sitio_caida']) ? implode(', ', $_POST['sitio_caida']) : '';
    $equipo_mobiliario = isset($_POST['equipo_mobiliario']) ? implode(', ', $_POST['equipo_mobiliario']) : '';
    $otro_equipo = $_POST['otro_equipo'] ?? '';
    $entorno = isset($_POST['entorno']) ? implode(', ', $_POST['entorno']) : '';
    $actividad = isset($_POST['actividad']) ? implode(', ', $_POST['actividad']) : '';
    $medicamentos_paciente = isset($_POST['medicamentos_paciente']) ? implode(', ', $_POST['medicamentos_paciente']) : '';
    $estado_paciente = isset($_POST['estado_paciente']) ? implode(', ', $_POST['estado_paciente']) : '';
    $observaciones = $_POST['observaciones'] ?? '';

    // Consulta para la tabla notificaciones_caida
    $consulta_paciente = $conexion->prepare("INSERT INTO notificaciones_caida (nombre, apellido, sexo, edad, diagnostico_ingreso, servicio_clinico, sala, hora_caida, dia_caida, lesiones, ubicacion_lesion, descripcion_caida, sitio_caida, equipo_mobiliario, otro_equipo, entorno, actividad, medicamentos_paciente, estado_paciente, observaciones) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

    $consulta_paciente->bind_param("sssissssssssssssssss", $nombre, $apellido, $sexo, $edad, $diagnostico_ingreso, $servicio_clinico, $sala, $hora_caida, $dia_caida, $lesiones, $ubicacion_lesion, $descripcion_caida, $sitio_caida, $equipo_mobiliario, $otro_equipo, $entorno, $actividad, $medicamentos_paciente, $estado_paciente, $observaciones);

    if ($consulta_paciente->execute()) {
        echo "Datos de notificaciones_caida insertados correctamente.";
    } else {
        echo "Error al insertar datos en notificaciones_caida: " . $consulta_paciente->error;
    }

    $consulta_paciente->close();

    enviarCorreoNotificacionCaida($nombre, $apellido, $sexo, $edad, $diagnostico_ingreso, $servicio_clinico, $sala, $hora_caida, $dia_caida, $lesiones, $ubicacion_lesion, $descripcion_caida, $sitio_caida, $equipo_mobiliario, $otro_equipo, $entorno, $actividad, $medicamentos_paciente, $estado_paciente, $observaciones);
}

$conexion->close();
?>




<br><br>

<button><a href="eventos_adversos.html">Generar otro formulario Eventos Adversos</a></button>

<button><a href="notificaciones_caida.html">Generar una notificacion de caida</a></button>
