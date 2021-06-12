'use strict';
//Slider
let glide = new Glide('.glide', {
    type: 'slider', //hay dos tipos slider y carrousel
    startAt: 1, //a dónde inicia el slider
    peek: 1, //tamaño de los elementos
    gap: 0, //espacio entre los elementos
    bound: false, // que no llegue hasta el final
    hoverpause: true, // pausa cuandos se hace hover
    focusAt: 'center', // estará enfocada en el centro 
    keyboard: true, // permite el uso del teclado
    autoplay: 2000, //tiempo del slide en miliseg
    perView: 1, //cantidad de slide en pantalla
    breakpoints: { //para otros dispositivos
        800: { perView: 2 }, //elementos para tablet
        480: { perView: 1 } // elementos para mobile
    }
})

glide.mount()  


