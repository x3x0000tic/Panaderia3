document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const correoInput = document.getElementById('correo');
    const passwordInput = document.getElementById('password');

    // 🔹 Verificar sesión
    const verificarSesion = () => {
        const userId = localStorage.getItem("userId");
        if (userId) window.location.href = "perfil.html";
    };

    // 🔹 Validaciones
    const validarFormulario = () => {
        const correo = correoInput.value.trim();
        const password = passwordInput.value.trim();

        if (!correo || !password) {
            Swal.fire('Campos incompletos', 'Completa todos los campos', 'warning');
            return false;
        }

        if (!/\S+@\S+\.\S+/.test(correo)) {
            Swal.fire('Correo inválido', 'Ingresa un correo válido', 'error');
            return false;
        }

        if (password.length < 5 || password.length > 10) {
            Swal.fire('Contraseña inválida', 'La contraseña debe tener entre 5 y 10 caracteres', 'info');
            return false;
        }

        if (/\s/.test(password)) {
            Swal.fire('Error', 'La contraseña no puede tener espacios', 'error');
            return false;
        }

        return true;
    };

    // 🔹 Función que maneja el envío del formulario
    const handleSubmit = () => {
        const correo = correoInput.value.trim();
        const contraseña = passwordInput.value.trim();

        fetch('/iniciar-sesion', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ correo, contraseña })
        })
        .then(res => res.json())
        .then(data => {
            console.log('Respuesta del servidor:', data); // para depuración
            if (data.success) {
                localStorage.setItem("userId", data.userId);
                Swal.fire({
                    icon: 'success',
                    title: '¡Bienvenido!',
                    text: `Hola ${data.nombre}`,
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    window.location.href = "perfil.html";
                });
            } else {
                Swal.fire('Error', data.message || 'Correo o contraseña incorrectos', 'error');
            }
        })
        .catch(err => {
            console.error(err);
            Swal.fire('Error', 'Ocurrió un error al iniciar sesión', 'error');
        });
    };

    // 🔹 Enter mueve entre campos y envía solo si todo está completo
    [correoInput, passwordInput].forEach((input, idx, arr) => {
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (idx < arr.length - 1) {
                    arr[idx + 1].focus();
                } else {
                    if (validarFormulario()) handleSubmit();
                }
            }
        });
    });

    // 🔹 Submit por click o enter final
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (validarFormulario()) handleSubmit();
    });

    verificarSesion();
});
