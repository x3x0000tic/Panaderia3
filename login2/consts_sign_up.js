import { soloLetras, etiquetasFixerEmail, validarCorreo } from "../validaciones/input_validations.js"
import { registroLleno } from "../validaciones/important_functions.js"
import { procesoRegistro } from "./sign_up.js"

const nombre = document.getElementById('nombre') 
const correo = document.getElementById('correo')
const password = document.getElementById('password')
const inputsNecesarios = document.getElementsByClassName('required')

const btnSignUp = document.getElementById('btn_sign_up')


nombre.addEventListener('input', () => {
    soloLetras(nombre)
})

correo.addEventListener('input', () => {
    etiquetasFixerEmail(correo)
})

password.addEventListener('input', () => {
    etiquetasFixerEmail(password)
})

btnSignUp.addEventListener('click', (event) => {
    event.preventDefault()

    const lleno = registroLleno(inputsNecesarios)
    const verificado = validarCorreo(correo)

    if ( (lleno && verificado) === true ) {
        procesoRegistro(nombre, correo, password)
    }
})