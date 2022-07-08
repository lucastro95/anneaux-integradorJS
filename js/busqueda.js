import { cargarProductos } from "./cargarProductos.js";
import { rings } from "./db.js";
import { mostrarError } from "./error.js";
import { search } from "./variables.js";

export function busqueda(e) {
    e.preventDefault()
    const dato = search.value.toLowerCase()
    const productoBuscado = rings.filter(ring => ring.name.toLowerCase().includes(dato))
    console.log(rings.length);
    if(!search.value) {
        mostrarError('Se debe llenar el campo de búsqueda')
    } else {
        if(productoBuscado.length === 0) {
            mostrarError('No se encontraron resultados con ese nombre')
        }
        cargarProductos(productoBuscado)
    }
}