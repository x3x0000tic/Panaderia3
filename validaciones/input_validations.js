
export function soloLetras (idInput) {
    const valorInput = idInput.value;
    let auxiliar = "";

    for (let i = 0; i < valorInput.length; i++) {
        if (/[^a-zA-ZáéíóúñÁÉÍÓÚÑ ]/.test(valorInput.charAt(i))) {
            idInput.setCustomValidity('Solo caracteres alfabéticos (A-Z)');
            idInput.reportValidity();
            break
        } 
        else {
            idInput.setCustomValidity('');
            idInput.reportValidity();
            auxiliar += valorInput.charAt(i)
        }
    }

    idInput.value = auxiliar
}   

export function soloNumeros (idInput) {
    const valorInput = idInput.value;
    let auxiliar = "";

    for (let i = 0; i < valorInput.length; i++) {
        if (/[^0-9]/.test(valorInput.charAt(i))) {
            idInput.setCustomValidity('Solo caracteres numéricos (0-9)');
            idInput.reportValidity();
            break
        }
        else {
            idInput.setCustomValidity('');
            idInput.reportValidity();
            auxiliar += valorInput.charAt(i)
        }
    }

    idInput.value = auxiliar
}

export function etiquetasFixer (idInput) {
    const valorInput = idInput.value;
    let auxiliar = "";

    for (let i = 0; i < valorInput.length; i++) {
        if (/[^0-9a-zA-ZáéíóúñÁÉÍÓÚÑ¿?¡!"., ]/.test(valorInput.charAt(i))) {
            idInput.setCustomValidity('Caracteres peligrosos no permitidos (<`$>)');
            idInput.reportValidity();
            break
        }
        else {
            idInput.setCustomValidity('');
            idInput.reportValidity();
            auxiliar += valorInput.charAt(i)
        }
    }

    idInput.value = auxiliar
}

export function etiquetasFixerEmail (idInput) {
    const valorInput = idInput.value;
    let auxiliar = "";

    for (let i = 0; i < valorInput.length; i++) {
        if (/[^0-9a-zA-ZáéíóúñÁÉÍÓÚÑ¿?¡!.,@_-]/.test(valorInput.charAt(i))) {
            idInput.setCustomValidity('Caracteres peligrosos no permitidos (<`$>)');
            idInput.reportValidity();
            break
        }
        else {
            idInput.setCustomValidity('');
            idInput.reportValidity();
            auxiliar += valorInput.charAt(i)
        }
    }

    idInput.value = auxiliar
}

export function validarCorreo(correo) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if ( regex.test(correo.value) === false ) {
        correo.setCustomValidity('Pon una estructura de correo válida')
        correo.reportValidity()
        return false
    } else {
        return true
    }
}

export function fechaPosterior (idFecha) {
    const fecha = new Date(idFecha.value)
    const hoy = new Date()
    
    fecha.setHours(0,0,0,0)
    hoy.setHours(0,0,0,0)

    if( !(fecha.getTime() > hoy.getTime()) ) {
        return fechaAnterior(fecha, hoy, idFecha)
    }

    idFecha.setCustomValidity('La fecha todavía no ocurre')
    idFecha.reportValidity()
    idFecha.value = idFecha.defaultValue
}

export function fechaAnterior (fecha, hoy, idFecha) {
    if( !(hoy.getTime() - fecha.getTime() >= 1296000000) ) {
        idFecha.setCustomValidity('');
        idFecha.reportValidity();
        return true
    }

    idFecha.setCustomValidity('Esperamos que encuentres a tu amigo')
    idFecha.reportValidity()
    idFecha.setCustomValidity('');
    idFecha.reportValidity();
}