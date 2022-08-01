import { agregarProducto, eliminarProducto, eliminarTodos, leerLocalStorage } from "./agregarProducto.js"
import { busqueda } from "./busqueda.js"
import { cargarProductos } from "./cargarProductos.js"
import { rings } from "./db.js"
import { filtrar } from "./filtrar.js"
import { menuHamburguesa } from "./menu-hamburguesa.js"
import * as v from "./variables.js"

addEventListener('DOMContentLoaded', () => {
    menuHamburguesa()
    cargarProductos(rings)
    leerLocalStorage()
})

// Obj de búsqueda
export const objBusqueda = {
    metal: '',
    min: 0,
    max: 0
}

// Listeners 

v.form.addEventListener('submit', busqueda)
v.mostrarTodo.addEventListener('click', function() {
    cargarProductos(rings)
})
v.selectMetal.addEventListener('change',(e) => {
    objBusqueda.metal = e.target.value
    filtrar()
})
v.selectMin.addEventListener('change',(e) => {
    objBusqueda.min = parseInt(e.target.value)
    filtrar()
})
v.selectMax.addEventListener('change',(e) => {
    objBusqueda.max = parseInt(e.target.value)
    filtrar()
})

v.listaProductos.addEventListener('click', agregarProducto)

v.eliminarTodos.addEventListener('click', eliminarTodos)

v.carrito.addEventListener('click', (e) => eliminarProducto(e))