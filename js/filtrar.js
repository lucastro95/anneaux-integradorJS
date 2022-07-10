import { objBusqueda } from './app.js'
import { cargarProductos } from './cargarProductos.js'
import { rings } from './db.js'
import { mostrarError } from './error.js'


export function filtrar(e) {
    const resultado = rings.filter(filtrarMetal).filter(filtrarMin).filter(filtrarMax)
    if(resultado.length) {
        cargarProductos(resultado)
    } else {
        mostrarError('No se encontraron productos')
    }
}

function filtrarMetal(ring) {
    if(objBusqueda.metal){
        return ring.metal === objBusqueda.metal
    }
    return ring
}

function filtrarMin(ring) {
    if(objBusqueda.min){
        return ring.price >= objBusqueda.min
    }
    return ring
}

function filtrarMax(ring) {
    if(objBusqueda.max){
        return ring.price <= objBusqueda.max
    }
    return ring
}