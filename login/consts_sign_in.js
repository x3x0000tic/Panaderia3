import { etiquetasFixerEmail } from "../validaciones/input_validations.js"
import { iniciarSesion } from "./sign_in.js"
import { registroLleno } from "../validaciones/important_functions.js"

const correo = document.getElementById('correo')
const password = document.getElementById('password')
const btSignIn = document.getElementById('btn_sign_in')
const inputsNecesarios = document.getElementsByClassName('required')

correo.addEventListener('input', () => {
    etiquetasFixerEmail(correo)
})

password.addEventListener('input', () => {
    etiquetasFixerEmail(password)
})

btSignIn.addEventListener('click', (event) => {
    event.preventDefault()

    const lleno = registroLleno(inputsNecesarios)
    
    if ( lleno === true ) {
        iniciarSesion(correo, password)
    }
})