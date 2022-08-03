import * as v from './variables.js'

let user, password = false

const expresiones = {
    password: /^.{4,12}$/, // 4 a 12 digitos.
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
  };

export function mostrarModal(e) {
    e.preventDefault()
    v.modal.classList.add('modal--show')
}

export function cerrarModal() {
    v.modal.classList.remove('modal--show')
}

export function validarFormulario(e) {
    switch (e.target.name) {
        case 'user':
            if (expresiones.usuario.test(e.target.value)) {
                v.user.classList.remove('error')
                document.getElementById('error-message').style = 'visibility:hidden'
                document.getElementById('error-message').textContent = ''
                user = true
            } else {
                v.user.classList.add('error')
                document.getElementById('error-message').style = 'visibility:visible'
                document.getElementById('error-message').textContent = 'El usuario solo puede contener letras, numeros, guión y guión bajo'
                user = false
            }
            break;

        case 'password':
            if (expresiones.password.test(e.target.value)) {
                v.password.classList.remove('error')
                v.errorMessage.style = 'visibility:hidden'
                v.errorMessage.textContent = ''
                password = true
            } else {
                v.password.classList.add('error')
                v.errorMessage.style = 'visibility:visible'
                v.errorMessage.textContent = 'La contraseña debe tener entre 4 y 12 caracteres'
                password = false
            }
            break;
    
        default:
            break;
    }

    if (user && password) {
        v.btnSesion.disabled = false
    } else {
        v.btnSesion.disabled = true
    }
}

export function iniciarSesion(e) {
    e.preventDefault()
    v.modal.classList.remove('modal--show')
}