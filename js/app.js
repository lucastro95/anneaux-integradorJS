import { busqueda } from "./busqueda.js"
import { cargarProductos } from "./cargarProductos.js"
import { rings } from "./db.js"
import { menuHamburguesa } from "./menu-hamburguesa.js"
import * as v from "./variables.js"

addEventListener('DOMContentLoaded', () => {
    menuHamburguesa()
    cargarProductos(rings)
})

// Listeners 

v.form.addEventListener('submit', busqueda)
v.mostrarTodo.addEventListener('click', function() {
    cargarProductos(rings)
})