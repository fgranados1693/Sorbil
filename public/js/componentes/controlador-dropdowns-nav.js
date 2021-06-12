'use strict';
// Función que permite mostrar y ocultar los links de listados y registros
let opened = null

const toggleVisibility = click => click.classList.toggle('dropdown-mostrar');

let handleDropdown = click => {

    let clickedItem = click.parentElement.lastChild.previousSibling

    toggleVisibility(clickedItem)

    if (!opened) {
        opened = clickedItem
    } else if (opened == clickedItem) {
        opened = null
    } else {
        toggleVisibility(opened)
        opened = clickedItem
    }
};

let handleClick = click => {

    if (click.target.className.includes('dropdown-toggle')) {
        handleDropdown(click.target)
    } else if (opened) {
        toggleVisibility(opened)
        opened = null
    }
};

document.addEventListener('mouseover', handleClick);

