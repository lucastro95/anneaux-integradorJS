import { agregarProducto, eliminarProducto, eliminarTodos, leerLocalStorage } from "./agregarProducto.js"
import { busqueda } from "./busqueda.js"
import { cargarProductos } from "./cargarProductos.js"
import { rings } from "./db.js"
import { filtrar } from "./filtrar.js"
import { menuHamburguesa } from "./menu-hamburguesa.js"
import { cerrarModal, iniciarSesion, mostrarModal, validarFormulario } from "./validacionFormulario.js"
import * as v from "./variables.js"

addEventListener('DOMContentLoaded', () => {
    menuHamburguesa('.navBar__btn', '.navBar__menu', '.navBar__menu a')
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

v.iniciarSesion.addEventListener('click', mostrarModal)

v.cerrarModal.addEventListener('click', cerrarModal)

v.formInicio.addEventListener('submit', iniciarSesion)

v.inputs.forEach(input => {
    input.addEventListener("blur", validarFormulario);
    input.addEventListener("keyup", validarFormulario);
    input.addEventListener("change", validarFormulario);
})