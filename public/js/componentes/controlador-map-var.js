// Funciones para obtener coordenadas de google maps

let corlatitud;
let corlongitud;

let latitud = (platitud) => {
    corlatitud = platitud;
};

let longitud = (plongitud) => {
    corlongitud = plongitud;
};

let enviarLat = () => {
    return corlatitud;
}

let enviarLon = () => {
    return corlongitud;
}