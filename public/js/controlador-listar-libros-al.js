'use strict';

const sct_libros = document.querySelector('#lista_libros');
const filtro_libros = document.querySelector('#txt-filtro');
const btn_misLibros = document.querySelector('#libros-libreria');

let listarLibrosCards = async () => {
    let libros = await obtenerLibros();

    for (let i = 0; i < libros.length; i++) {
        if (libros[i].estado == 'habilitado') {
            if (libros[i].cantidad > 0) {
                let contenedor_card = document.createElement('div');
                contenedor_card.classList.add('card');

                let header = document.createElement('header');
                let h2 = document.createElement('h2');
                h2.innerText = libros[i]['titulo'];

                header.appendChild(h2);

                let contenedor_imagen = document.createElement('div');
                contenedor_imagen.classList.add('contenedor_imagen');
                let foto = document.createElement('img');
                foto.src = libros[i]['portada'];

                contenedor_imagen.appendChild(foto);

                let contenedor_atributo = document.createElement('div');
                contenedor_atributo.classList.add('contenedor_atributo');
                let categoria = document.createElement('p');
                let genero = document.createElement('p');
                categoria.innerText = libros[i]['categoria'];
                genero.innerText = libros[i]['genero'];

                contenedor_atributo.appendChild(categoria);
                contenedor_atributo.appendChild(genero);

                let contenedor_precio = document.createElement('div');
                contenedor_precio.classList.add('contenedor_precio');
                let precio = document.createElement('p');
                precio.innerText = libros[i]['precio'];

                contenedor_precio.appendChild(precio);

                let contenedor_cantidad = document.createElement('div');
                contenedor_cantidad.classList.add('contenedor_cantidad');
                let cantidad = document.createElement('p');
                let texto_cantidad = document.createElement('p');
                cantidad.innerText = libros[i].cantidad;
                texto_cantidad.innerText = 'Cantidad:  ';

                contenedor_cantidad.appendChild(texto_cantidad);
                contenedor_cantidad.appendChild(cantidad);

                let btn_agregar = document.createElement('button');
                btn_agregar.innerText = 'Agregar a mi librería';
                btn_agregar.addEventListener('click', function () {
                    agregar_libros_libreria(libros[i]['_id'], libros[i].cantidad, libros[i]._id);
                });

                let btn_perfil = document.createElement('a');
                btn_perfil.innerText = 'Ver libro';
                btn_perfil.dataset._id = libros[i]['_id'];
                btn_perfil.addEventListener('click', function () {
                    window.location.href = `ver-perfil-libro.html?_id=${this.dataset._id}`;
                });

                contenedor_card.appendChild(contenedor_imagen);
                contenedor_card.appendChild(header);
                contenedor_card.appendChild(contenedor_atributo);
                contenedor_card.appendChild(contenedor_cantidad);
                contenedor_card.appendChild(contenedor_precio);
                contenedor_card.appendChild(btn_agregar);
                contenedor_card.appendChild(btn_perfil);

                sct_libros.appendChild(contenedor_card);
            }

        }
    }
}
let validarSiYaExisteLibro = (pid, plibros, pcantidad) => {
    let existe = false;

    for (let i = 0; i < plibros.length; i++) {

        if (pid == plibros[i].idlibro) {
            existe = true;
            let num1 = parseInt(plibros[i].cantidad);
            let num2 = parseInt(pcantidad);
            let suma = num1 + num2;
            let nuevaCantidad = suma.toString();
            plibros[i].cantidad = nuevaCantidad;
        }
    }

    if (existe) {
        return plibros;
    } else {
        return false;
    }

};
let restarCantidadLibros = (pcantidadIngresada, pCantidadExistente, pid) => {
    let cantidadInt = parseInt(pcantidadIngresada);
    let resta = pCantidadExistente - cantidadInt;

    actualizarCantidadLibros(pid, resta);


}

let agregar_libros_libreria = async (pid, pcantidad, pidLibro) => {
    let usuarioActivoEnRegistroLibros = JSON.parse(sessionStorage.getItem('activo'));
    let correoUserActivo = usuarioActivoEnRegistroLibros.correo;
    let librosEnLibreria = await obtenerDatosCorreo(correoUserActivo);




    Swal.fire({
        title: 'Cantidad de libros que deseas añadir',
        html: '<input type="number" id="txt-cantidad" placeholder="Ingresá la cantidad de libros">'
    }).then(() => {
        let cantidad = document.querySelector('#txt-cantidad').value;
        if (cantidad) {
            let resultado = validar_cantidad_libros(cantidad, pcantidad);
            if (resultado) {
                Swal.fire(
                    'Error',
                    'Ingrese un valor válido.',
                    'warning'
                )
            } else {
                Swal.fire(
                    'Libros registados',
                    'Los libros se han registrado con éxito.',
                    'success'
                ).then((result) => {
                    if (result.value) {
                        window.location.reload();
                    }
                });
                let existe = validarSiYaExisteLibro(pid, librosEnLibreria, cantidad);
                if (existe) {
                    actualizarLibrosLibreria(existe, correoUserActivo);
                    restarCantidadLibros(cantidad, pcantidad, pidLibro);
                } else {
                    registrar_libros_libreria(correoUserActivo, pid, cantidad);
                    restarCantidadLibros(cantidad, pcantidad, pidLibro);
                }
            }


        }
    });


}

let validar_cantidad_libros = (pcantidad, pcantidadStockLibros) => {
    let error = false;
    if (pcantidad < 0) {
        error = true;
    }
    if (pcantidad == '') {
        error = true;
    }
    if (pcantidad > pcantidadStockLibros) {
        error = true;
    }
    if (pcantidad == 0) {
        error = true;
    }

    return error;
}

let filtrar_libros_catalogos = async () => {
    let filtro = filtro_libros.value.toLowerCase();
    let libros_filtro = await obtenerLibros();
    sct_libros.innerHTML = '';

    for (let i = 0; i < libros_filtro.length; i++) {
        if (libros_filtro[i]['titulo'].toLowerCase().includes(filtro) || libros_filtro[i]['categoria'].toLowerCase().includes(filtro) || libros_filtro[i]['genero'].toLowerCase().includes(filtro) || libros_filtro[i]['precio'].toLowerCase().includes(filtro)) {
            if (libros_filtro[i].estado == 'habilitado') {


                let contenedor_card = document.createElement('div');
                contenedor_card.classList.add('card');

                let header = document.createElement('header');
                let h2 = document.createElement('h2');
                h2.innerText = libros_filtro[i]['titulo'];


                header.appendChild(h2);

                let contenedor_imagen = document.createElement('div');
                contenedor_imagen.classList.add('contenedor_imagen');
                let foto = document.createElement('img');
                foto.src = libros_filtro[i]['portada'];

                contenedor_imagen.appendChild(foto);

                let contenedor_atributo = document.createElement('div');
                contenedor_atributo.classList.add('contenedor_atributo');
                let categoria = document.createElement('p');
                let genero = document.createElement('p');
                categoria.innerText = libros_filtro[i]['categoria'];
                genero.innerText = libros_filtro[i]['genero'];

                contenedor_atributo.appendChild(categoria);
                contenedor_atributo.appendChild(genero);

                let contenedor_precio = document.createElement('div');
                contenedor_precio.classList.add('contenedor_precio');
                let precio = document.createElement('p');
                precio.innerText = libros_filtro[i]['precio'];

                contenedor_precio.appendChild(precio);

                let contenedor_cantidad = document.createElement('div');
                contenedor_cantidad.classList.add('contenedor_cantidad');
                let cantidad = document.createElement('p');
                let texto_cantidad = document.createElement('p');
                cantidad.innerText = libros_filtro[i].cantidad;
                texto_cantidad.innerText = 'Cantidad:  ';

                contenedor_cantidad.appendChild(texto_cantidad);
                contenedor_cantidad.appendChild(cantidad);

                let btn_agregar = document.createElement('button');
                btn_agregar.innerText = 'Agregar a mi librería';
                btn_agregar.addEventListener('click', function () {
                    agregar_libros_libreria(libros_filtro[i]['_id'], libros_filtro[i].cantidad, libros_filtro[i]._id);
                });

                let btn_perfil = document.createElement('a');
                btn_perfil.innerText = 'Ver libro';
                btn_perfil.dataset._id = libros_filtro[i]['_id'];
                btn_perfil.addEventListener('click', function () {
                    window.location.href = `ver-perfil-libro.html?_id=${this.dataset._id}`;
                });

                contenedor_card.appendChild(contenedor_imagen);
                contenedor_card.appendChild(header);
                contenedor_card.appendChild(contenedor_atributo);
                contenedor_card.appendChild(contenedor_cantidad);
                contenedor_card.appendChild(contenedor_precio);
                contenedor_card.appendChild(btn_agregar);
                contenedor_card.appendChild(btn_perfil);

                sct_libros.appendChild(contenedor_card);
            }
        }

    }

}

btn_misLibros.addEventListener('click', function () {
    window.location.href = 'al-listar-libros-liberia.html';
});



listarLibrosCards();
filtro_libros.addEventListener('keyup', filtrar_libros_catalogos);