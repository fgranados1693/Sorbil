'use strict';
//Select
// let provincia = document.getElementById("txt-provincia");
// let canton = document.getElementById("txt-canton");
// let distrito = document.getElementById("txt-distrito");

// let valoresProvincia = () => {
//     let json = { "data": ["San José", "Alajuela", "Cartago", "Heredia", "Guanacaste", "Limón", "Puntarenas"] };

//     for (let i = 0; i < json.data.length; i++) {
//         let option = document.createElement("option");
//         option.text = json.data[i];
//         option.value = json.data[i];
//         provincia.add(option);
//     }
// }

// let valoresCanton = () => {
//     let json = { "data": ["1.1", "1.2", "1.3", "1.4", "1.5", "1.6", "1.7"] };

//     for (let i = 0; i < json.data.length; i++) {
//         let option = document.createElement("option");
//         option.text = json.data[i];
//         option.value = json.data[i];
//         canton.add(option);
//     }
// }

// let valoresDistrito = () => {
//     let json = { "data": ["2.1", "2.2", "2.3", "2.4", "2.5", "2.6", "2.7"] };

//     for (let i = 0; i < json.data.length; i++) {
//         let option = document.createElement("option");
//         option.text = json.data[i];
//         option.value = json.data[i];
//         distrito.add(option);
//     }
// }

// valoresProvincia();
// valoresCanton();
// valoresDistrito();

let ubicaciones = {
    "San José": {
        "Central": ["Carmen", "Catedral", "Hatillo", "Hospital", "La Uruca", "Mata Redonda", "Merced", "Pavas", "San Francisco de Dos Ríos", "San Sebastián", "Zapote"],
        "Acosta": ["Cangrejal", "Guaitil", "Palmichal", "Sabanillas", "San Ignacio"],
        "Alajuelita": ["Alajuelita", "Concepción", " San Antonio", "San Felipe", "San Josecito"],
        "Aserrí": ["Aserrí", "Legua", "Monterrey", "Salitrillos", "San Gabriel", "Tarbaca", " Vuelta de Jorco"],
        "Curridabat": ["Curridabat", "Granadilla", "Tirrases", "Sánchez"],
        "Desamparados": ["Damas", "Desamparados", "Calle Fallas", "San Rafael arriba", "Lomas", "Porvenir", "Dos Cercas", "San Antonio", "San Rafael abajo", "San Sebastián"],
        "Dota": ["Copey", "Santa María", "Poblados"],
        "Escazú": ["San Miguel", "San Antonio", "San Rafael"],
        "Goicochea": ["Calle Blancos", "Guadalupe", "San Francisco", "Mata de Plátano", "Ipís", "Rancho Redondo", "Purral"],
        "León Cortés": ["San Pablo", "San Andrés", "San Isidro", "Santa Cruz", "San Antonio"],
        "Montes de Oca": ["San Rafael", "Sabanilla", "San Pedro", "Mercedes"],
        "Mora": ["Ciudad Colón", "Guayabo", "Tabarcia", "Piedra Negras", "Picagres", "Jaris", "Quitirrisí"],
        "Moravia": ["San Jerónimo", "San Vicente", "La Trinidad"]
    },
    "Alajuela": {
        "Alajuela": ["Alajuela","San José","Carrizal","San Antonio","Guácima","San Isidro","Sabanilla", "Desamparados","Tambor", "La Garita", "Sarapiquí"],
        "San Ramón": ["San Ramón","Santiago","San Juan","Piedades Norte","Piedades Sur","San Rafael", "San Isidro", "Peñas Blancas"],
        "Grecia": ["Grecia","San Isidro", "San José","San Roque", "Tacares","Rio Cuarto"],
        "San Mateo": ["San Mateo", "Desmonte","Jesús María", "Labrador"],
        "Atenas": ["Atenas", "Jesús","Mercedes"],
        "Naranjo": ["Naranjo", "San Miguel", "San José"],
        "Palmares": ["Palmares", "Zaragoza", "Buenos Aires"],
        "Poás": ["San Pedro", "San Juan", "San Rafael"],
        "Orotina": ["Orotina", "El Mastate"],
        "San Carlos": ["Quesada", "Florencia", "Buenavista", "Aguas Zarcas"],
        "Zarcero": ["Zarcero", "Laguna", "Tapesco"],
        "Valverde Vega": ["Sarchí Norte", "Sarchí Sur", "Toro Amarillo"],
        "Upala": ["Upala", "Aguas Claras", "Bijagua"],
        "Los Chiles": ["Los Chiles", "Caño Negro", "San Jorge", "El Amparo"],
        "Guatuso": ["San Rafael", "Buena Vista", "Cote", "Katira"],
        "Río Cuarto": ["Río Cuarto", "Santa Isabel", "Santa Rita"]

    },
    "Cartago": {
        "Cartago": ["Oriental", "Occidental", "Carmen", "San Nicolás", "Aguacaliente", "Guadalupe", "Corralillo", "Tierra Blanca", "Dulce Nombre", "Quebradilla", "Paraíso", "Santiago", "Orosí"],
        "Paraíso": ["Paraíso", "Santiago", "Orosi", "Cachí", "Llanos de Santa Lucía"],
        "La Unión": ["Tres Ríos", "San Diego", "San Juan", "San Rafael", "Concepción", "Rio Azul"],
        "Jiménez": ["Juan Viñas", "Tucurrique", "Pejibaye", "Turrialba"],
        "Turrialba": ["Turrialba", "La Suiza", "Peralta", "Pavones"],
        "Alvarado": ["Pacayas", "Cervantes", "Capellades", "San Rafael"],
        "Oreamuno": ["San Rafael", "Cot", "Potrero Cerrado", "Cipreces", "Santa Rosa"],
        "El Guarco": ["El Tejar", "San Isidro","Tobosi", "Patio de Agua"]
    },
    "Heredia": {
        "Heredia": ["Heredia", "Mercedes", "San Francisco", "Ulloa", "Vara Blanca"],
        "Barva": ["Barva", "San Pedro", "San Pablo", "San Roque", "Santa Lucía", "San José de la Montaña"],
        "Santo Domingo": ["Santo Domingo", "San Vicente", "San Miguel", "Paracito", "Santo Tomás", "Santa Rosa", "Tures", "Pará"],
        "Santa Bárbara": ["Santa Bárbara","San Pedro","San Juan","Jesús", "Santo Domingo", "Purabá"],
        "San Rafael": ["San Rafael","San Josecito","Santiago","Los Ángeles","Concepción"],
        "San Isidro": ["San Isidro", "San José", "Concepción", "San Francisco"],
        "Belén": ["San Antonio", "La Ribera", "La Asunción"],
        "Flores": ["San Joaquín", "Barrantes", "Llorente"],
        "San Pablo": ["San Pablo", "Rincón De Sabanilla"],
        "Sarapiquí":["Puerto Viejo", "La Virgen", "Horquetas", "Llanura de Gaspar", "Cureña"]  

    },
    "Guanacaste": {
        "Liberia": ["Liberia","Mayorga", "Cañas Dulces","Curubandé","Nacascolo"],
        "Nicoya": ["Nicoya","Mansión", "San Antonio","Quebrada Honda", "Sámara", "Nosara", "Belén de Nosarita"],
        "Santa Cruz": ["Santa Cruz", "Bolsón", "Veintisiete de Abril", "Tempate", "Cartagena", "Quajiniquil", "Diriá", "Cabo Velas", "Tamarindo"],
        "Bagaces": ["Bagaces", "La Fortuna", "Mogote", "Rio Naranjo"],
        "Carrillo": ["Filadelfia", "Palmira", "Sardinal", "Belén"],
        "Cañas": ["Cañas", "Palmira", "San Miguel", "Bebedero", "Porozal"],
        "Abangares": ["Las Juntas", "Sierra", "San Juan", "Colorado"],
        "Tilarán": ["Tilarán", "Quebrada Grande", "Tronadora", "Arenal", "Tierras Morenas"]
    },
    "Puntarenas": {
        "Puntarenas": ["Puntarenas", "Pitahaya", "Chomes", "Lepanto", "Manzanillo", "Guacimal", "Barranca", "Monteverde", "Isla del Coco", "Cóbano", "Chocanol", "Chira"],
        "Esparza": ["Espíritu Santo", "San Juan Grande", "Macacona", "Caldera", "San Jerónimo", "San Rafael"],
        "Buenos Aires": ["Buenos Aires", "Volcán", "Potrero Grande", "Boruca", "Biolley", "Brunka"],
        "Montes De Oro": ["Miramar", "La Unión", "San Isidro"],
        "Osa": ["Puerto Cortés", "Palmar", "Sierpe", "Bahía Ballena", "Bahía Drake"],
        "Quepos": ["Quepos", "Savegre", "Naranjito"],
        "Golfito": ["Golfito", "Puerto Jiménez", "Guaycará"],
        "Coto Brus": ["San Vito", "Agua Buena", "Limoncito", "Pitier", "Gutierrez Brown"],
        "Parrita": ["Parrita"], 
        "Garabito": ["Jacó", "Tárcoles"],


    },
    "Limón": {
        "Limón": ["Limón","Valle La Estrella", "Río Blanco", "Matama"],
        "Pococí": ["Guápiles", "Jiménez", "Rita", "Roxana", "Cariari", "Colorado", "La Colonia", "Siquirres"],
        "Siquirres": ["Siquirres", "Pacuarito", "Florida", "Germania", "Cairo", "Alegría"],
        "Talamanca": ["Bratsi", "Sixaola", "Cahuita", "Telire"],
        "Matina": ["Matina", "Batán", "Carrandí"],
        "Guácimo": ["Guácimo", "Mercedes", "Pocora", "Río Jiménez", "Duacari"],
    }

}



let provincia = document.querySelector("#txt-provincia"),
    canton = document.querySelector("#txt-canton"),
    distrito = document.querySelector("#txt-distrito");
let  cedulas = document.querySelector("txt-cedulas");

for (let opt_provincia in ubicaciones) {
    provincia.options[provincia.options.length] = new Option(opt_provincia, opt_provincia);
}
provincia.onchange = function () {
    canton.length = 1;
    distrito.length = 1;
    if (this.selectedIndex < 1) return;
    for (let opt_canton in ubicaciones[this.value]) {
        canton.options[canton.options.length] = new Option(opt_canton, opt_canton);
    }
}
provincia.onchange();
canton.onchange = function () {
    distrito.length = 1;
    if (this.selectedIndex < 1) return;
    let opt_distritos = ubicaciones[provincia.value][this.value];
    for (let i = 0; i < opt_distritos.length; i++) {
        distrito.options[distrito.options.length] = new Option(opt_distritos[i], opt_distritos[i]);
    }
}


/*cedulas.onchange();
cedidentidad.onchange = function () {
    cedidentidad.length = 9;
    if (this.selectedIndex < 9) return;
    let opt_cedulas = cedulas[cedulas.value][this.value];
    for (let i = 0; i < opt_cedulas.length; i++) {
        cedulas.options[cedulas.options.length] = new Option(opt_cedulas[i], opt_cedulas[i]);
    }
}

cedulas.onchange();
cedresidencia.onchange = function () {
    cedresidencia.length = 12;
    if (this.selectedIndex < 12) return;
    let opt_cedulas = cedulas[cedulas.value][this.value];
    for (let i = 0; i < opt_cedulas.length; i++) {
        cedulas.options[cedulas.options.length] = new Option(opt_cedulas[i], opt_cedulas[i]);
    }
}

cedulas.onchange();
carnerefugiado.onchange = function () {
    carnerefugiado.length = 9;
    if (this.selectedIndex < 9) return;
    let opt_cedulas = cedulas[cedulas.value][this.value];
    for (let i = 0; i < opt_cedulas.length; i++) {
        cedulas.options[cedulas.options.length] = new Option(opt_cedulas[i], opt_cedulas[i]);
    }
}*/























