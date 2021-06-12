'use strict';

const urlParams = new URLSearchParams(window.location.search);
let input_nombre = document.querySelector('#input_nombre_modi');
let div_tarjeta = document.querySelector('#div-numTarjeta');
let input_fecha_ven = document.querySelector('#input_fecha_ven_modi');
let input_cvv = document.querySelector('#input_cvv_modi');
let input_tarjeta = document.querySelector('#input_num_tarjeta_modi');
let btn_actualizar = document.querySelector('#btn_enviar_modi');

let UsuarioModificarTarjetas = JSON.parse(sessionStorage.getItem('activo'));
let id_usuario_activo_modificar_tarjetas = UsuarioModificarTarjetas._id;

let posicion = urlParams.get('_i');

let fecha_vencimiento = new Cleave('.input_fecha', {
    date: true,
    datePattern: ['m', 'd']
})

let cvv = new Cleave('.cvv', {
    blocks: [3],
    uppercase: true
});

let validar_tarjeta = new Cleave('.input_numero_tarjeta', {
    creditCard: true,
    onCreditCardTypeChanged: function (type) {
        if (type == 'amex'){
            tipo_tarjeta.className = 'fab fa-cc-amex';
        } else if (type == 'visa'){
            tipo_tarjeta.className = 'fab fa-cc-visa-visa';
        } else if(type == 'diners'){
            tipo_tarjeta.className = 'fab fa-cc-diners-club';
        } else if(type == 'mastercard'){
            tipo_tarjeta.className = 'fab fa-cc-mastercard';
        }else if (type =='jcb'){
            tipo_tarjeta.className = 'fab fa-cc-jcb';
        } else if (type == 'discover'){
            tipo_tarjeta.className = 'fab fa-cc-discover';
        }else if (type == 'unknown'){
            tipo_tarjeta.className = '';
            
        }
    }
});

let validar = (pnombre, pnumtarjeta, pfecha, pcvv) => {
    let error = false;
    
    if (pnombre.value == ''){
        error = true;
        input_nombre.classList.add('input_error');
    } else {
        input_nombre.classList.remove('input_error');
    }

    if (pfecha.value == ''){
        error = true;
        input_fecha_ven.classList.add('input_error');
    } else {
        input_fecha_ven.classList.remove('input_error');
    }

    if (pnumtarjeta.value == '' || validar_tarjeta.properties.creditCardType == 'unknown'){
        error = true;
        div_tarjeta.classList.add('input_error');
    } else {
        div_tarjeta.classList.remove('input_error');
    }
    if (pcvv.value == ''){
        error = true;
        input_cvv.classList.add('input_error');
    } else {
        input_cvv.classList.remove('input_error');
    }

    return error;
}
let datosFuncion = async() =>{
    let datosUsuario =  await obtenerUsuarioId(id_usuario_activo_modificar_tarjetas);

    return datosUsuario;
}

let llenarDatos = async() =>{
    let datosUsuario =  await datosFuncion();
    posicion = parseInt(posicion);


    input_nombre.value = datosUsuario.tarjetas[posicion].nombre;
    input_tarjeta.value = datosUsuario.tarjetas[posicion].num_tarjeta;
    input_fecha_ven.value = datosUsuario.tarjetas[posicion].fecha_ven;
    input_cvv.value = datosUsuario.tarjetas[posicion].cvv;
    
}



let registrarModificacion = async() =>{
    let error = validar(input_nombre, input_tarjeta, input_fecha_ven, input_cvv);
    if(!error){
        posicion = parseInt(posicion);
        let datosUsuario = await datosFuncion();
        datosUsuario.tarjetas[posicion].nombre = input_nombre.value;
        datosUsuario.tarjetas[posicion].num_tarjeta = input_tarjeta.value;
        datosUsuario.tarjetas[posicion].fecha_ven = input_fecha_ven.value;
        datosUsuario.tarjetas[posicion].cvv = input_cvv.value;
        console.log(datosUsuario.tarjetas[posicion]);

        actualizarTarjetas(datosUsuario, id_usuario_activo_modificar_tarjetas);
        window.location.href =`p-tarjetas.html?_id=${id_usuario_activo_modificar_tarjetas}`;

    }else{Swal.fire({ //formato json
        title: 'No se ha registrado la información',
        type: 'warning',
        text: 'Revise los campos resaltados e inténtelo de nuevo'
    })

    }
}


btn_actualizar.addEventListener('click', registrarModificacion);



llenarDatos();