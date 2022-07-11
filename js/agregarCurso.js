import { rings } from "./db.js";
import * as v from './variables.js'

export let articulosCarrito = []
const cantidadCarrito = document.createElement('div')


export function agregarCurso(e) {
    e.preventDefault()
    // console.log(e.target.classList.contains('agregar-producto'));
    if (e.target.classList.contains('agregar-producto')) {
        const productoSeleccionado = e.target.parentElement.parentElement.parentElement.parentElement
        const id = parseInt(productoSeleccionado.getAttribute('data-id'))
        leerDatos(id)
    }
}

function leerDatos(idProducto) {
    const ring = rings.find(ring => ring.id === idProducto)
    const {name, price, url, id} = ring
    const infoProducto = {
        imagen: url,
        nombre: name,
        precio: price,
        id: id,
        cantidad: 1
    }

    const existe = articulosCarrito.some(producto => producto.id === infoProducto.id)

    if(existe) {
        // Si existe solo le suma la cantidad
        articulosCarrito.map(producto => {
            if(producto.id === infoProducto.id) producto.cantidad++
            return
        })
    } else {
        // Agregar elementos al carrito
        articulosCarrito = [...articulosCarrito, infoProducto]
    }

    carritoHTML(articulosCarrito)
}

function carritoHTML(articulos) {
    limpiarHTML()
    let total = 0
    let cantidadTotal = 0
    
    articulos.map(art => {
        const {imagen, nombre, precio, cantidad} = art
        total += precio * cantidad
        cantidadTotal += cantidad

        const row = document.createElement('tr')
        row.innerHTML = 
        `
        <td><img src="${imagen}" alt="Anillo ${nombre}"></td>
        <td>${nombre}</td>
        <td>$${precio * cantidad} <p>x${cantidad}u.</p></td>
        <td><button class="min"><i class="lni lni-minus"></i></button></i>${cantidad}<button class="max"><i class="lni lni-plus"></i></button></td>
        `
        v.carrito.appendChild(row)
    })

    if (total === 0){
        v.total.innerHTML = `<span></span>No hay productos en el carrito`
    } else {
        v.total.innerHTML = `<span>Total: </span>$${total}`
    }

    if (cantidadTotal !== 0) {   
        cantidadCarrito.classList.add('compras__carrito__cantidad')
        cantidadCarrito.innerText = `${cantidadTotal}`
        v.cantidad.appendChild(cantidadCarrito)
    }
    
}

function limpiarHTML() {
    while (v.carrito.firstChild) {
        v.carrito.removeChild(v.carrito.firstChild)
    }
}

export function eliminarTodos() {
    carritoHTML(articulosCarrito = [])
    cantidadCarrito.parentNode.removeChild(cantidadCarrito)
}