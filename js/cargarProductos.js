import * as v from './variables.js'

export function cargarProductos(rings) {
    limpiarHTML()
    rings.map(ring => {
        const {name, metal, price, url, id} = ring

        const card = document.createElement('div')
        card.classList.add('coleccion__cards__card')
        card.setAttribute('data-id', id)

        const container = document.createElement('div')
        container.classList.add('container')
        container.style = `background:url("${url}");background-position:center;background-size:cover;`
        
        container.innerHTML = 
        `
        <div class="overlay">
            <div class="items head">
                <p class='title'>${name}</p>
                <p class="subtitle">${metal}</p>
            </div>
            <div class="items price">
                <p class="new">$${price}</p>
            </div>
            <div class="items cart">
                <i class="lni lni-cart-full"></i>
                <button class='agregar-producto'>ADD TO CART</button>
            </div>
        </div>
        `
        card.appendChild(container)
        v.coleccion.appendChild(card)
    })
}

function limpiarHTML() {
    while(v.coleccion.firstChild) {
        v.coleccion.removeChild(v.coleccion.firstChild)
    }
}