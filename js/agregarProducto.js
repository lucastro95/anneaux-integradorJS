import { rings } from "./db.js";
import * as v from './variables.js'

export let articulosCarrito = []
const cantidadCarrito = document.createElement('div')


export function agregarProducto(e) {
    e.preventDefault()

    if (e.target.classList.contains('agregar-producto')) {
        const productoSeleccionado = e.target.parentElement.parentElement.parentElement.parentElement
        const id = parseInt(productoSeleccionado.getAttribute('data-id'))
        const btn = e.target
        leerDatos(id, btn)
    }
}

function leerDatos(idProducto, btn) {
    const ring = rings.find(ring => ring.id === idProducto)
    const {name, price, url, stock, id} = ring
    const infoProducto = {
        imagen: url,
        nombre: name,
        precio: price,
        id: id,
        stock: stock,
        cantidad: 1
    }

    infoProducto.stock--

    const existe = articulosCarrito.some(producto => producto.id === infoProducto.id)

    if(existe) {
        // Si existe solo le suma la cantidad
        articulosCarrito.map(producto => {
            if(producto.id === infoProducto.id) {
                if (producto.stock > 0) {
                    producto.cantidad++
                    producto.stock--
                    console.log(producto.stock);
                } else {
                    btn.disabled = true
                    btn.innerText = 'Sin Stock'
                }
            }
            return
        })
    } else {
        // Agregar elementos al carrito
        articulosCarrito = [...articulosCarrito, infoProducto]
    }

    carritoHTML(articulosCarrito)
    guardarProductosLocalStorage(articulosCarrito.find(prod => prod.id === infoProducto.id))

}

function carritoHTML(articulos) {
    limpiarHTML()
    let total = 0
    let cantidadTotal = 0
    
    articulos.map(art => {
        const {imagen, nombre, precio, id, cantidad} = art
        total += precio * cantidad
        cantidadTotal += cantidad

        const row = document.createElement('tr')
        row.innerHTML = 
        `
        <td><img src="${imagen}" alt="Anillo ${nombre}"></td>
        <td>${nombre}</td>
        <td>$${precio * cantidad} <p>x${cantidad}u.</p></td>
        <td>${cantidad}</td>
        <td><button data-id='${id}' class='borrar-producto'><i class="lni lni-trash-can"></i></button></td>
        `
        v.carrito.appendChild(row)
    })

    if (total === 0){
        v.total.innerHTML = `<span></span>No hay productos en el carrito`
    } else {
        v.total.innerHTML = `<span>Total: </span>$${total}`
    }

    if (cantidadTotal !== 0) {   
        cantidadCarrito.style = 'visibility:visible'
        cantidadCarrito.classList.add('compras__carrito__cantidad')
        cantidadCarrito.innerText = `${cantidadTotal}`
        v.cantidad.appendChild(cantidadCarrito)
    } else {
        cantidadCarrito.style = 'visibility:hidden'
    }
}


function limpiarHTML() {
    while (v.carrito.firstChild) {
        v.carrito.removeChild(v.carrito.firstChild)
    }
}

export function eliminarProducto(e) {
    e.preventDefault()
    let productoID
    if(e.target.parentElement.matches('.borrar-producto')) {
        productoID = parseInt(e.target.parentElement.getAttribute('data-id'))
        const producto = articulosCarrito.find(el => el.id === productoID)
        const stockOriginal = rings.find(el => el.id === productoID)
        producto.stock = stockOriginal.stock
        articulosCarrito = articulosCarrito.filter(producto => producto.id !== productoID)
        
        eliminarProductoLocalStorage(productoID)
        carritoHTML(articulosCarrito)
    }
    
}

export function eliminarTodos() {
    carritoHTML(articulosCarrito = [])
    cantidadCarrito.parentNode.removeChild(cantidadCarrito)
    vaciarLocalStorage()
}

export function agregarProductos(e) {
    const producto = e.target.parentElement.parentElement
    console.log(producto);
}



// Funciones LocalStorage


function guardarProductosLocalStorage(producto) {
    let productos = obtenerProductosLocalStorage()
    productos.forEach(function(prod, index){
        if (prod.id === producto.id) {
            productos.splice(index, 1)
        }
    })
    productos.push(producto)
    localStorage.setItem('productos', JSON.stringify(productos))
}

function obtenerProductosLocalStorage() {
    let productoLS

    if(localStorage.getItem('productos') === null) {
        productoLS = []
    } else {
        productoLS = JSON.parse(localStorage.getItem('productos'))
    }

    return productoLS
}

function eliminarProductoLocalStorage(productoID) {
    let productosLS = obtenerProductosLocalStorage()
    productosLS.forEach((productoLS, index) => {
        if(productoLS.id === productoID) {
            productosLS.splice(index, 1)
        }
    })

    localStorage.setItem('productos', JSON.stringify(productosLS))
}


function vaciarLocalStorage() {
    localStorage.clear()
}

export function leerLocalStorage() {
    let productosLS = obtenerProductosLocalStorage()
    let total = 0
    let cantidadTotal = 0
    productosLS.forEach(producto => {

        articulosCarrito.push(producto)
        const {imagen, nombre, precio, id, cantidad} = producto
        total += precio * cantidad
        cantidadTotal += cantidad

        const row = document.createElement('tr')
        row.innerHTML = 
        `
        <td><img src="${imagen}" alt="Anillo ${nombre}"></td>
        <td>${nombre}</td>
        <td>$${precio * cantidad} <p>x${cantidad}u.</p></td>
        <td>${cantidad}</td>
        <td><button data-id='${id}' class='borrar-producto'><i class="lni lni-trash-can"></i></button></td>
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