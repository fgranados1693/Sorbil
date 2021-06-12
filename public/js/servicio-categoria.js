'use strict';

let registrarCategoria = (pcategoria) => {
    axios({
        method: 'post',
        url: 'http://localhost:4000/api/registrar-categoria',
        responseType: 'json',
        data: {
            categoria: pcategoria
        }
    });
};

let obtenerCategorias = async () => {
    try {
        // fetch data from a url endpoint
        const response = await axios({
            method: 'get',
            url: 'http://localhost:4000/api/listar-categorias',
            responseType: 'json'
        });

        const result = await response;

        return result.data.lista_categorias;
    } catch (error) {
        alert(error);
    }
};

let cambiarEstadoCatergorias = (pid, pestado) =>{
    axios({
        method: 'post',
        url: 'http://localhost:4000/api/modificar-estado-categorias',
        responseType: 'json',
        data: {
            _id: pid,
            estado: pestado
        }
    });
}

let modificarCategorias =(pid, pcategoria)=>{
    axios({
        method: 'post',
        url: 'http://localhost:4000/api/modificar-categorias',
        responseType: 'json',
        data: {
            _id: pid,
            categoria: pcategoria
        }
    });

}

let eliminarcategoria =(pid)=>{
    axios({
        method: 'post',
        url: 'http://localhost:4000/api/eliminar-categorias',
        responseType: 'json',
        data: {
            _id: pid
        }
    });

}