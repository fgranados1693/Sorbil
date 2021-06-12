'use strict';
var map;
function initMap() {  
    map;
    let latitude = 9.934739; // YOUR LATITUDE VALUE
    let longitude = -84.087502; // YOUR LONGITUDE VALUE

    let myLatLng = { lat: latitude, lng: longitude };

    map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        zoom: 14,
        disableDoubleClickZoom: true, // disable the default map zoom on double click
    });

    let marker = new google.maps.Marker({
        map: map,
        position: myLatLng,
        draggable: true
    });

    google.maps.event.addListener(marker, 'dragend', function () {

        let valuelatitud = marker.getPosition().lat();
        let valuelongitud = marker.getPosition().lng();
        longitud(valuelongitud);
        latitud(valuelatitud);

    });    
}