export function registroLleno(inputs) {
    for (let i = 0; i < inputs.length; i++) {
        if ( inputs[i].value === inputs[i].defaultValue ) {
            inputs[i].setCustomValidity('Todos los campos son requeridos')
            inputs[i].reportValidity()
            return false
        }

        inputs[i].setCustomValidity('')
        inputs[i].reportValidity()
    }

    return true
}

export function recordarSesion(usuario) {
    const Usuario = {
        id_usuario: usuario.id_usuario,
        nombre: usuario.nombre,
        correo: usuario.correo,
        permisos: usuario.permisos 
    }

    localStorage.setItem('usuario', JSON.stringify( Usuario ))

    window.location.href = '/index'
}

export function obtenerImagen (cargarImagen, imageDefault, e) {
    return new Promise ((resolve) => {
        let image64x = ""
    
        if(e.target.files[0]){
            const reader = new FileReader()

            reader.onload = function (e){
                image64x = e.target.result
                cargarImagen.src = e.target.result
                resolve(image64x)
            }
            reader.readAsDataURL(e.target.files[0])
        } else{
            cargarImagen.src = imageDefault
        }
    })
}