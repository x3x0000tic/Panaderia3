document.addEventListener('DOMContentLoaded', () => {
    const campos = [
        document.getElementById('nombre'),
        document.getElementById('correo'),
        document.getElementById('password')
    ];
    const btnSignUp = document.getElementById('btn_sign_up');

    // 🔹 Validar solo letras en nombre
    campos[0].addEventListener('input', () => {
        campos[0].value = campos[0].value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
    });

    const registrarUsuario = async () => {
        const [nombre, correo, password] = campos;

        if (!nombre.value || !correo.value || !password.value) {
            Swal.fire({ icon: 'warning', title: 'Campos incompletos', text: 'Por favor llena todos los campos' });
            return;
        }

        if (nombre.value.length < 3) {
            Swal.fire({ icon: 'info', title: 'Nombre muy corto', text: 'El nombre debe tener al menos 3 letras' });
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.value)) {
            Swal.fire({ icon: 'error', title: 'Correo inválido', text: 'Ingresa un correo válido' });
            return;
        }

        if (password.value.length < 5) {
            Swal.fire({ icon: 'error', title: 'Contraseña débil', text: 'La contraseña debe tener al menos 5 caracteres' });
            return;
        }

        try {
            const response = await fetch('/agregarUsuario', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre: nombre.value, gmail: correo.value, password: password.value })
            });

            const data = await response.json();

            if (data.success) {
                Swal.fire({ icon: 'success', title: 'Registro exitoso 🎉', text: 'Tu cuenta ha sido creada correctamente', confirmButtonText: 'Iniciar sesión' })
                    .then(() => window.location.href = '/sign_in');
            } else {
                Swal.fire({ icon: 'error', title: 'Error', text: data.message || 'No se pudo registrar el usuario' });
            }

        } catch (error) {
            console.error('Error al registrar:', error);
            Swal.fire({ icon: 'error', title: 'Error del servidor', text: 'Intenta más tarde' });
        }
    };

    // 🔹 Click del botón
    btnSignUp.addEventListener('click', (event) => {
        event.preventDefault();
        registrarUsuario();
    });

    // 🔹 Manejar Enter y flechas
    campos.forEach((campo, index) => {
        campo.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                // Si no es el último campo, pasa al siguiente
                if (index < campos.length - 1) {
                    campos[index + 1].focus();
                } else {
                    registrarUsuario(); // Último campo → registra
                }
            } else if (event.key === 'ArrowDown') {
                event.preventDefault();
                if (index < campos.length - 1) campos[index + 1].focus();
            } else if (event.key === 'ArrowUp') {
                event.preventDefault();
                if (index > 0) campos[index - 1].focus();
            }
        });
    });
});
