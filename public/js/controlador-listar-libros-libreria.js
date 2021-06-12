

const sct_libros = document.querySelector('#lista_libros');

let listarLibrosCards = async () => {
    let usuarioActivoEnListarLibros = JSON.parse(sessionStorage.getItem('activo'));
    let correoUserActivo = usuarioActivoEnListarLibros.correo;
    let libros = await obtenerLibros();
    let libros_libreria = await obtenerDatosCorreo(correoUserActivo);
    let datosLibreria = await obtenerLibreriaPorCorreo(correoUserActivo);
    

    for (let index = 0; index < libros_libreria.length; index++) {
        for (let j = 0; j < libros.length; j++) {
            if (libros[j]._id == libros_libreria[index].idlibro) {
                if (libros[j].estado == 'habilitado') {

                    let contenedor_card = document.createElement('div');
                    contenedor_card.classList.add('card');

                    let header = document.createElement('header');
                    let h2 = document.createElement('h2');
                    h2.innerText = libros[j]['titulo'];


                    header.appendChild(h2);

                    let contenedor_imagen = document.createElement('div');
                    contenedor_imagen.classList.add('contenedor_imagen');
                    let foto = document.createElement('img');
                    foto.src = libros[j]['portada'];

                    contenedor_imagen.appendChild(foto);

                    let contenedor_atributo = document.createElement('div');
                    contenedor_atributo.classList.add('contenedor_atributo');
                    let categoria = document.createElement('p');
                    let genero = document.createElement('p');
                    categoria.innerText = libros[j]['categoria'];
                    genero.innerText = libros[j]['genero'];

                    contenedor_atributo.appendChild(categoria);
                    contenedor_atributo.appendChild(genero);

                    let contenedor_precio = document.createElement('div');
                    contenedor_precio.classList.add('contenedor_precio');
                    let precio = document.createElement('p');
                    precio.innerText = libros[j]['precio'];

                    contenedor_precio.appendChild(precio);

                    let contenedor_cantidad = document.createElement('div');
                    contenedor_cantidad.classList.add('contenedor_cantidad');
                    let cantidad = document.createElement('p');
                    let texto_cantidad = document.createElement('p');
                    cantidad.innerText = libros_libreria[index].cantidad;
                    texto_cantidad.innerText = 'Cantidad:  ';

                    contenedor_cantidad.appendChild(texto_cantidad);
                    contenedor_cantidad.appendChild(cantidad);

                    let btn_agregar_Sucursal = document.createElement('button');
                    btn_agregar_Sucursal.innerText = 'Agregar a sucursal';
                    btn_agregar_Sucursal.addEventListener('click', function () {
                        window.location.href = `al-registrar-libros-sucursal.html?_id=${libros[j]._id}`;
                        
                    });

                    let btn_perfil = document.createElement('a');
                    btn_perfil.innerText = 'Ver libro';
                    btn_perfil.dataset._id = libros[j]['_id'];
                    btn_perfil.addEventListener('click', function () {
                        window.location.href = `ver-perfil-libro.html?_id=${this.dataset._id}`;
                    });

                    contenedor_card.appendChild(contenedor_imagen);
                    contenedor_card.appendChild(header);
                    contenedor_card.appendChild(contenedor_atributo);
                    contenedor_card.appendChild(contenedor_cantidad);
                    contenedor_card.appendChild(contenedor_precio);
                    contenedor_card.appendChild(btn_agregar_Sucursal);
                    contenedor_card.appendChild(btn_perfil);

                    sct_libros.appendChild(contenedor_card);
                }
            }
        }
    }

}



listarLibrosCards();