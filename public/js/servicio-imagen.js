$(function() {
    let imagenUrl = '';
    
    //ConfiguracionCloudinary
    //with credentials available on
    // your cloudinary account dashboard
    $.cloudinary.config({cloud_name: 'fenixsorbil', api_key: '774377416574617'});
    
    //Upload button
    let uploaButton = $('#btnSeleccionarImagen');
    let uploadButton2 = $('#btnSeleccionarImagen2');
    
    //Upload button event
    uploaButton.on('click', function(e){
            //Initiate upload
            cloudinary.openUploadWidget({cloud_name: 'fenixsorbil', upload_preset: 'uploaduser', tags:['cgal']},
            function(error, result){
                if(error) console.log(error);
                //if no Error, log img data to console
                let id = result[0].public_id;

                imagenUrl = 'https://res.cloudinary.com/fenixsorbil/image/upload/' + id;
                document.querySelector('#portada').src = imagenUrl;
            });    
        });

    uploadButton2.on('click', function(e){
            //Initiate upload
            cloudinary.openUploadWidget({cloud_name: 'fenixsorbil', upload_preset: 'uploaduser', tags:['cgal']},
            function(error, result){
                if(error) console.log(error);
                //if no Error, log img data to console
                let id = result[0].public_id;
                imagenUrl = 'https://res.cloudinary.com/fenixsorbil/image/upload/' + id;
                document.querySelector('#contraportada').src = imagenUrl;
            });    
        });  
    })
    
    function processImage(id) {
        let options = {
            client_hints: true,
        };
        return $.cloudinary.url(id, options);
    };

    