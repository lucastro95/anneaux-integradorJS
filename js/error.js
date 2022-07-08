import { cargarProductos } from "./cargarProductos.js";
import { rings } from "./db.js";
import * as v from "./variables.js"

export function mostrarError(mensaje) {
    v.error.style = 'visibility:visible'
    v.error.innerText = mensaje;
    setTimeout(() => {
        v.error.style = 'visibility:hidden'
        v.error.innerText = '';
        cargarProductos(rings)
    }, 5000)
}