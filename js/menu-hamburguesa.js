const btn = document.querySelector('.navBar__btn'),
    menubar = document.querySelector('.navBar__menu')

export function menuHamburguesa() {
    btn.addEventListener('click', (e) => {
        e.preventDefault()
        btn.classList.toggle('is-active')
        menubar.classList.toggle('is-active')
    })
}