<?php

//require 'vendor/autoload.php'; // Autoload de Composer

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

// Datos del servidor
$servidor = "localhost";
$usuario = "root";
$contraseña = "";
$baseDeDatos = "formularios_hospital";

$conexion = new mysqli($servidor, $usuario, $contraseña, $baseDeDatos);

if ($conexion->connect_errno) {
    die("Conexión fallida: " . $conexion->connect_errno);
}

// Función para enviar correo para evento adverso
function enviarCorreoEventoAdverso($ev_rut, $ev_ficha, $ev_fecha_ea, $ev_servicio, $ev_piso, $ev_reporta_ocurrencia, $ev_piso_ambito, $ev_ambito,  $ev_reportar_evento, $ev_descripcion, $ev_acciones, $ev_daño, $ev_daño_descripcion, $ev_notificacion) {
    $mail = new PHPMailer(true);
    try {
        // Configuración del servidor de correo
        $mail->isSMTP();
        $mail->Host = 'smtp.office365.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'manuel.arrano@redsalud.gob.cl';
        $mail->Password = 'Jar46967'; 
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
        $mail->Body .= "Servicio que reporta: $ev_servicio<br>";
        $mail->Body .= "Piso: $ev_piso<br>";
        $mail->Body .= "Servicio de ocurrencia: $ev_reporta_ocurrencia<br>";
        $mail->Body .= "Piso/Ambito: $ev_piso_ambito<br>";
        $mail->Body .= "Ámbito: $ev_ambito<br>";        
        $mail->Body .= "Eventos a reportar: $ev_reportar_evento<br>";
        $mail->Body .= "Descripción: $ev_descripcion<br>";
        $mail->Body .= "Acciones: $ev_acciones<br>";
        $mail->Body .= "Daño: $ev_daño<br>";
        $mail->Body .= "Descripcion del daño: $ev_daño_descripcion <br>";
        $mail->Body .= "Notificación: $ev_notificacion<br>";

        $mail->send();
        echo 'Correo enviado';
    } catch (Exception $e) {
        echo 'Mensaje: ' . $mail->ErrorInfo;
    }
}

// Función para enviar correo para notificación de caída
function enviarCorreoNotificacionCaida($nombre, $apellido, $sexo, $edad, $diagnostico_ingreso, $servicio_clinico, $sala, $hora_caida, $dia_caida, $lesiones, $ubicacion_lesion, $descripcion_caida, $sitio_caida, $equipo_mobiliario, $otro_equipo, $entorno, $entorno_timbre, $entorno_iluminacion, $entorno_espacio, $actividad, $medicamentos_paciente, $estado_paciente, $observaciones) {
    $mail = new PHPMailer(true);
    try {
        // Configuración del servidor de correo
        $mail->isSMTP();
        $mail->Host = 'smtp.office365.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'manuel.arrano@redsalud.gob.cl';
        $mail->Password = 'Jar46967'; 
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
        $mail->Body .= "Entorno: $entorno_timbre<br>";
        $mail->Body .= "Entorno: $entorno_iluminacion<br>";
        $mail->Body .= "Entorno: $entorno_espacio<br>";
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
    $ev_reporta_ocurrencia = $_POST['ev_reporta_ocurrencia'] ?? '';
    $ev_piso_ambito = $_POST['ev_piso_ambito'] ?? '';
    $ev_ambito = $_POST['ev_ambito'] ?? '';    
    $ev_reportar_evento = $_POST['ev_reportar_evento'] ?? '';
    $ev_descripcion = $_POST['ev_descripcion'] ?? '';
    $ev_acciones = $_POST['ev_acciones'] ?? '';
    $ev_daño = isset($_POST['ev_daño']) ? $_POST['ev_daño'] : '';
    $ev_daño_descripcion = isset($_POST['ev_daño_descripcion']) ? $_POST['ev_daño_descripcion'] : '';
    $ev_notificacion = $_POST['ev_notificacion'] ?? '';

    // Consulta para la tabla eventos_adversos
    $consulta_evento = $conexion->prepare("INSERT INTO evento_adversos (ev_rut, ev_ficha, ev_fecha_ea, ev_servicio, ev_piso, ev_reporta_ocurrencia, ev_piso_ambito, ev_ambito, ev_reportar_evento, ev_descripcion, ev_acciones, ev_daño, ev_daño_descripcion, ev_notificacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

    $consulta_evento->bind_param("ssssssssssssss", $ev_rut, $ev_ficha, $ev_fecha_ea, $ev_servicio, $ev_piso, $ev_reporta_ocurrencia, $ev_piso_ambito, $ev_ambito,  $ev_reportar_evento, $ev_descripcion, $ev_acciones, $ev_daño, $ev_daño_descripcion, $ev_notificacion);

    if ($consulta_evento->execute()) {
        echo "<script>
            alert('Formulario ingresado de forma exitosa');
            window.location.href = 'http://localhost/formularios_hospital/menu.html';
        </script>";
    } else {
        echo "<script>alert('Error al insertar datos en evento adversos: " . $consulta_evento->error . "');</script>";
    }

    $consulta_evento->close();

    enviarCorreoEventoAdverso($ev_rut, $ev_ficha, $ev_fecha_ea, $ev_servicio, $ev_reporta_ocurrencia, $ev_piso, $ev_piso_ambito, $ev_ambito, $ev_reportar_evento, $ev_descripcion, $ev_acciones, $ev_daño, $ev_daño_descripcion, $ev_notificacion);
    
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
    $entorno_timbre = isset($_POST['entorno_timbre']) ? implode(', ', $_POST['entorno_timbre']) : '';
    $entorno_iluminacion = isset($_POST['entorno_iluminacion']) ? implode(', ', $_POST['entorno_iluminacion']) : '';
    $entorno_espacio = isset($_POST['entorno_espacio']) ? implode(', ', $_POST['entorno_espacio']) : '';
    $actividad = isset($_POST['actividad']) ? implode(', ', $_POST['actividad']) : '';
    $medicamentos_paciente = isset($_POST['medicamentos_paciente']) ? implode(', ', $_POST['medicamentos_paciente']) : '';
    $estado_paciente = isset($_POST['estado_paciente']) ? implode(', ', $_POST['estado_paciente']) : '';
    $observaciones = $_POST['observaciones'] ?? '';

    // Consulta para la tabla notificaciones_caida
    $consulta_paciente = $conexion->prepare("INSERT INTO notificaciones_caida (nombre, apellido, sexo, edad, diagnostico_ingreso, servicio_clinico, sala, hora_caida, dia_caida, lesiones, ubicacion_lesion, descripcion_caida, sitio_caida, equipo_mobiliario, otro_equipo, entorno, entorno_timbre, entorno_iluminacion, entorno_espacio, actividad, medicamentos_paciente, estado_paciente, observaciones) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

    $consulta_paciente->bind_param("sssisssssssssssssssssss", $nombre, $apellido, $sexo, $edad, $diagnostico_ingreso, $servicio_clinico, $sala, $hora_caida, $dia_caida, $lesiones, $ubicacion_lesion, $descripcion_caida, $sitio_caida, $equipo_mobiliario, $otro_equipo, $entorno, $entorno_timbre, $entorno_iluminacion, $entorno_espacio, $actividad, $medicamentos_paciente, $estado_paciente, $observaciones);

    if ($consulta_paciente->execute()) {
        echo "<script>
            alert('Formulario ingresado de forma exitosa');
            window.location.href = 'http://localhost/formularios_hospital/menu.html';
        </script>";
    } else {
        echo "<script>alert('Error al insertar datos en notificaciones de caída: " . $consulta_paciente->error . "');</script>";
    }

    $consulta_paciente->close();

    enviarCorreoNotificacionCaida($nombre, $apellido, $sexo, $edad, $diagnostico_ingreso, $servicio_clinico, $sala, $hora_caida, $dia_caida, $lesiones, $ubicacion_lesion, $descripcion_caida, $sitio_caida, $equipo_mobiliario, $otro_equipo, $entorno, $entorno_timbre, $entorno_iluminacion, $entorno_espacio, $actividad, $medicamentos_paciente, $estado_paciente, $observaciones);
    
}

$conexion->close();

?>









