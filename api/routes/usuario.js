'use strict';

const nodeMailer = require('nodemailer');
const express = require('express'),
	router = express.Router(),
	Usuario = require('../models/usuario.model');

//Definicion de credenciales para enviar correos

const transporter = nodeMailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'fenixsorbil@gmail.com',
		pass: 'Fenix0627201'
	}
});


router.param('_id', function (req, res, next, _id) {
	req.body._id = _id;
	next();
});

router.param('correo', function (req, res, next, correo) {
	req.body.correo = correo;
	next();
});

router.post('/registrar-usuario', function (req, res) {
	let body = req.body;

	let nuevo_usuario = new Usuario({
		avatar: body.avatar,
		usuario: body.usuario,
		correo: body.correo,
		contrasena: body.contrasena,
		nombre: body.nombre,
		id: body.id,
		primer_apellido: body.primer_apellido,
		segundo_apellido: body.segundo_apellido,
		sexo: body.sexo,
		cedulas: body.cedulas,
		provincia: body.provincia,
		canton: body.canton,
		distrito: body.distrito,
		direccion_exacta: body.direccion_exacta,
		direccion_latitud: body.direccion_latitud,
		direccion_longitud: body.direccion_longitud,
		tipo_usuario: body.tipo_usuario,
		edad: body.edad,
		fecha: body.fecha,
		estado: body.estado
	});

	nuevo_usuario.save(
		function (err, usuariosBD) {
			if (err) {
				return res.status(400).json({
					success: false,
					msj: 'El usuario no se pudo guardar',
					err
				});
			} else {
				res.json({
					success: true,
					msj: 'El usuario se guardó con éxito'
				});
			}
		}
	);
});

router.post('/validar-credenciales', function (req, res) {
	Usuario.findOne({ correo: req.body.correo }).then(
		function (usuario) {
			if (usuario) {
				if (usuario.contrasena == req.body.contrasena) {
					res.json({
						success: true,
						usuario: usuario
					});
				} else {
					res.json({
						success: false,
						hola: "Aqui"
					});
				}
			} else {
				res.json({
					success: false,
					msg: 'El usuario no existe'
				});
			}
		}
	)
});

router.get('/listar-usuarios', function (req, res) {
	Usuario.find(function (err, usuariosBD) {
		if (err) {
			return res.status(400).json({
				success: false,
				msj: 'No se pueden listar los usuarios',
				err
			});
		} else {
			return res.json({
				success: true,
				lista_usuarios: usuariosBD
			});
		}
	})
});

router.get('/buscar-usuario-id/:_id', function (req, res) {
	Usuario.findById(req.body._id, function (err, usuarioDB) {
		if (err) {
			return res.status(400).json({
				success: false,
				msj: 'No se encontro ninguna librería con ese _id.',
				err
			});
		} else {
			return res.json({
				success: true,
				usuario: usuarioDB
			});
		}
	})
});

router.get('/buscar-usuario-correo/:correo', function (req, res) {
	Usuario.find({ correo: req.body.correo }, function (err, usuarioBD) {
		if (err) {
			return res.status(400).json({
				success: false,
				msj: 'No se encontró ningún usuario con ese correo',
				err
			});
		} else {
			return res.json({
				success: true,
				usuario: usuarioBD
			});
		}
	})
});

router.post('/agregar-tarjeta', function (req, res) {
	Usuario.update({ _id: req.body._id }, {
		$push: {
			'tarjetas': {
				nombre: req.body.nombre,
				num_tarjeta: req.body.num_tarjeta,
				fecha_ven: req.body.fecha_ven,
				cvv: req.body.cvv,
				estado: 'habilitado'
			}
		}
	},
		function (error) {
			if (error) {
				return res.status(400).json({
					success: false,
					msj: 'No se pudo agregar la tarjeta',
					error
				});
			} else {
				res.json({
					success: true,
					msj: 'La tarjeta se guardó con éxito'
				});
			}
		}
	)
});

router.get('/buscar-tarjetas/:_id', function (req, res) {
	Usuario.findById(req.body._id, function (err, usuarioDB) {
		if (err) {
			return res.status(400).json({
				success: false,
				msj: 'No se encontro ningun usuario con ese id.',
				err
			});
		} else {
			return res.json({
				success: true,
				usuario: usuarioDB
			});
		}
	})
});

router.post('/deshabilitar-usuario', function (req, res) {
	let body = req.body;

	Usuario.findByIdAndUpdate(body._id, {
		$set: {
			estado: 'Deshabilitado'
		}
	},
		function (error) {
			if (error) {
				console.log("error")
				console.log(error)
				res.json({ success: false, msg: 'No se pudo deshabilitar el usuario' });
			} else {
				console.log("sirve")
				res.json({ success: true, msg: 'El usuario se deshabilitó con éxito' });
			}
		}
	)
});

router.post('/habilitar-usuario', function (req, res) {
	let body = req.body;

	Usuario.findByIdAndUpdate(body._id, {
		$set: {
			estado: req.body.estado,
		}
	},
    function (error, correo) {
			if (error) {
				res.json({ success: false, msg: 'No se pudo habilitar el usuario' });
			} else {
				let mailOptions = {
					from: 'fenixsorbil@gmail.com',
					to: correo.correo,
					subject: 'Bienvenido a Sorbil',
          html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
<meta name="format-detection" content="date=no">
<meta name="format-detection" content="telephone=no"/>
<meta name="x-apple-disable-message-reformatting">
<title>Sorbil</title>

	<!--[if mso]>

	<style>

	* {font-family: Arial, Helvetica, sans-serif !important;}

	</style>

	<![endif]-->

	<!--[if !mso]><!-->

	<link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700,300&subset=latin,cyrillic,greek" rel="stylesheet" type="text/css">

	<!--<![endif]-->

	<style type="text/css">

	
    
    .ReadMsgBody { width: 100%; background-color: #ffffff;}
    .ExternalClass {width: 100%; background-color: #ffffff;}
    .ExternalClass, .ExternalClass p, .ExternalClass span,
    .ExternalClass font, .ExternalClass td, .ExternalClass tbody {line-height:100%;}
    #outlook a { padding:0;}
    html,body {margin: 0 auto !important; padding: 0 !important; height: 100% !important; width: 100% !important;}
    * {-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;}
    table,td {mso-table-lspace: 0pt !important; mso-table-rspace: 0pt !important;}
    table {border-spacing: 0 !important;}
    table table table {table-layout: auto;}
    a,span a{text-decoration: none !important;}
    .yshortcuts, .yshortcuts a, .yshortcuts a:link,.yshortcuts a:visited,
    .yshortcuts a:hover, .yshortcuts a span { text-decoration: none !important; border-bottom: none !important;}

    /*mailChimp class*/
    ul{padding-left:10px; margin:0;}
    .default-edit-image{height:20px;}
    .tpl-repeatblock {padding: 0px !important; border: 1px dotted rgba(0,0,0,0.2);}
    .tpl-content {padding:0px !important;}

    /* Start Old CSS */
    @media only screen and (max-width: 640px){
    .container{width:95%!important; max-width:95%!important; min-width:95%!important;
    padding-left:15px!important; padding-right:15px!important; text-align: center!important; clear: both;}
    .full-width{width:100%!important; max-width:100%!important; min-width:100%!important; clear: both;}
    .full-width-center {width: 100%!important; max-width:100%!important;  text-align: center!important; clear: both; margin:0 auto; float:none;}
    .force-240-center{width:240px !important; clear: both; margin:0 auto; float:none;}
    .auto-center {width: auto!important; max-width:100%!important;  text-align: center!important; clear: both; margin:0 auto; float:none;}
    .auto-center-all{width: auto!important; max-width:75%!important;  text-align: center!important; clear: both; margin:0 auto; float:none;}
    .auto-center-all * {width: auto!important; max-width:100%!important;  text-align: center!important; clear: both; margin:0 auto; float:none;}
    .col-3,.col-3-not-full{width:30.35%!important; max-width:100%!important;}
    .col-2{width:47.3%!important; max-width:100%!important;}
    .full-block{display:block !important; clear: both;}
    /* image */
    .image-full-width img{width:100% !important; height:auto !important; max-width:100% !important;}
    /* helper */
    .space-w-20{width:3.57%!important; max-width:20px!important; min-width:3.5% !important;}
    .space-w-20 td:first-child{width:3.5%!important; max-width:20px!important; min-width:3.5% !important;}
    .space-w-25{width:4.45%!important; max-width:25px!important; min-width:4.45% !important;}
    .space-w-25 td:first-child{width:4.45%!important; max-width:25px!important; min-width:4.45% !important;}
    .space-w-30 td:first-child{width:5.35%!important; max-width:30px!important; min-width:5.35% !important;}
    .fix-w-20{width:20px!important; max-width:20px!important; min-width:20px!important;}
    .fix-w-20 td:first-child{width:20px!important; max-width:20px!important; min-width:20px !important;}
    .h-10{display:block !important;  height:10px !important;}
    .h-20{display:block !important;  height:20px !important;}
    .h-30{display:block !important; height:30px !important;}
    .h-40{display:block !important;  height:40px !important;}
    .remove-640{display:none !important;}
    .text-left{text-align:left !important;}
    .clear-pad{padding:0 !important;}
    }
    @media only screen and (max-width: 479px){
    .container{width:95%!important; max-width:95%!important; min-width:124px!important;
    padding-left:15px!important; padding-right:15px!important; text-align: center!important; clear: both;}
    .full-width,.full-width-479{width:100%!important; max-width:100%!important; min-width:124px!important; clear: both;}
    .full-width-center {width: 100%!important; max-width:100%!important; min-width:124px!important; text-align: center!important; clear: both; margin:0 auto; float:none;}
    .auto-center-all{width: 100%!important; max-width:100%!important;  text-align: center!important; clear: both; margin:0 auto; float:none;}
    .auto-center-all * {width: auto!important; max-width:100%!important;  text-align: center!important; clear: both; margin:0 auto; float:none;}
    .col-3{width:100%!important; max-width:100%!important; text-align: center!important; clear: both;}
    .col-3-not-full{width:30.35%!important; max-width:100%!important; }
    .col-2{width:100%!important; max-width:100%!important; text-align: center!important; clear: both;}
    .full-block-479{display:block !important; clear: both; padding-top:10px; padding-bottom:10px; }
    /* image */
    .image-full-width img{width:100% !important; height:auto !important; max-width:100% !important; min-width:124px !important;}
    .image-min-80 img{width:100% !important; height:auto !important; max-width:100% !important; min-width:80px !important;}
    .image-min-100 img{width:100% !important; height:auto !important; max-width:100% !important; min-width:100px !important;}
    /* halper */
    .space-w-20{width:100%!important; max-width:100%!important; min-width:100% !important;}
    .space-w-20 td:first-child{width:100%!important; max-width:100%!important; min-width:100% !important;}
    .space-w-25{width:100%!important; max-width:100%!important; min-width:100% !important;}
    .space-w-25 td:first-child{width:100%!important; max-width:100%!important; min-width:100% !important;}
    .space-w-30{width:100%!important; max-width:100%!important; min-width:100% !important;}
    .space-w-30 td:first-child{width:100%!important; max-width:100%!important; min-width:100% !important;}
    .remove-479{display:none !important;}
    img{max-width:280px !important;}
    .resize-font, .resize-font *{font-size: 37px !important; line-height: 48px !important;}
    }
    /* End Old CSS */

    @media only screen and (max-width:640px){
    .full-width,.container{width:95%!important; float:none!important; min-width:95%!important; max-width:95%!important; margin:0 auto!important; padding-left:15px; padding-right:15px; text-align: center!important; clear: both;}
    #mainStructure, #mainStructure .full-width .full-width,table .full-width .full-width, .container .full-width{width:100%!important; float:none!important; min-width:100%!important; max-width:100%!important; margin:0 auto!important; clear: both; padding-left:0; padding-right:0;}
    .no-pad{padding:0!important;}
    .full-block{display:block!important;}
    .image-full-width,
    .image-full-width img{width:100%!important; height:auto!important; max-width:100%!important; min-width: 100px !important;}
    .full-width.fix-800{min-width:auto!important;}
    .remove-block{display:none !important; padding-top:0px; padding-bottom:0px;}
    .pad-lr-20{padding-left:20px!important; padding-right:20px!important;}
    .row{display:table-row!important;}
    }

    @media only screen and (max-width:480px){
    .full-width,.container{width:95%!important; float:none!important; min-width:95%!important; max-width:95%!important; margin:0 auto!important; padding-left:15px; padding-right:15px; text-align: center!important; clear: both;}
    #mainStructure, #mainStructure .full-width .full-width,table .full-width .full-width,.container .full-width{width:100%!important; float:none!important; min-width:100%!important; max-width:100%!important; margin:0 auto!important; clear: both; padding-left:0; padding-right:0;}
    .no-pad{padding:0!important;}
    .full-block{display:block!important;}
    .image-full-width,
    .image-full-width img{width:100%!important; height:auto!important; max-width:100%!important; min-width: 100px !important;}
    .full-width.fix-800{min-width:auto!important;}
    .remove-block{display:none !important; padding-top:0px; padding-bottom:0px;}
    .pad-lr-20{padding-left:20px!important; padding-right:20px!important;}
    .row{display:table-row!important;}
    }

    td ul{list-style: initial; margin:0; padding-left:20px;}

	body{background-color:#ffffff; margin: 0 auto !important; height:auto!important;} #preview-template #mainStructure{padding:20px 0px 60px 0px!important;} .default-edit-image{height:20px;} tr.tpl-repeatblock , tr.tpl-repeatblock > td{ display:block !important;} .tpl-repeatblock {padding: 0px !important;border: 1px dotted rgba(0,0,0,0.2); }

	@media only screen and (max-width: 640px){ .full-block{display:table !important; padding-top:0px; padding-bottom:0px;} .row{display:table-row!important;} .image-100-percent img{ width:100%!important; height: auto !important; max-width: 100% !important; min-width: 124px !important;}}

	@media only screen and (max-width: 480px){ .full-block{display:table !important; padding-top:0px; padding-bottom:0px;} .row{display:table-row!important;}}


	*[x-apple-data-detectors], .unstyle-auto-detected-links *,

	.aBn{border-bottom: 0 !important; cursor: default !important;color: inherit !important; text-decoration: none !important;font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important;line-height: inherit !important;}

	.im {color: inherit !important;}

	.a6S {display: none !important; opacity: 0.01 !important;}

	img.g-img + div {display: none !important;}

	img {height: auto !important; line-height: 100%; outline: none; text-decoration: none !important; -ms-interpolation-mode:bicubic;}

	a img{ border: 0 !important;}

	a:active{color:initial } a:visited{color:initial }

	span a ,a {color:inherit; text-decoration: none !important;}

	.tpl-content{padding:0 !important;}

	table td {border-collapse:unset;}

	table p {margin:0;}

	table,img{min-width:0!important;}

	#mainStructure{padding:0 !important;}

	.row th{display:table-cell;}

	.row{display:flex;}

	</style>

	<!--[if mso]>

	<style type="text/css">

	body { font-size: 0; line-height: 0; }

	table,tr { font-size:1px; mso-line-height-alt:0; line-height:0; mso-margin-top-alt:1px;}

	body,table,td,span,a,font{font-family: Arial, Helvetica, sans-serif!important; mso-line-height-rule:exactly; -ms-text-size-adjust:100%; -webkit-text-size-adjust:100%;}

	a img{ border: 0 !important;}

	a{text-decoration: none !important;}

	table td ,table th{display:table-cell!important;}

	table,img{min-width:0!important;}

	</style>

	<![endif]-->

	<!--[if gte mso 9]><xml>

	<o:OfficeDocumentSettings>

	<o:AllowPNG/>

	<o:PixelsPerInch>96</o:PixelsPerInch>

	</o:OfficeDocumentSettings>

	</xml><![endif]-->

	<!--[if mso]>

	<xml xmlns:w="urn:schemas-microsoft-com:office:word">

	<w:WordDocument><w:AutoHyphenation/></w:WordDocument>

	</xml>

	<![endif]-->
</head>
<body  style="font-size:12px; width:100%; height:100%;">
<table id="mainStructure" class="full-width" width="800" align="center" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; max-width: 800px; outline: rgb(239, 239, 239) solid 1px; box-shadow: rgb(224, 224, 224) 0px 0px 30px 5px; margin: 0px auto;" bgcolor="#ffffff">
  <!-- START LAYOUT-3 ( HEADER / TEXT / BACKGROUND-IMAGE ) -->
  <tr>
    <td valign="top" align="center" style="background-color: #F3F5F7;" bgcolor="#f3f5f7">
      <!-- start container -->
      <table width="600" align="center" border="0" cellspacing="0" cellpadding="0" class="full-width" style="background-color: #f3f5f7; margin: 0px auto; width: 600px; min-width: 320px; max-width: 90%;" role="presentation" bgcolor="#f3f5f7">
        <tr>
          <td valign="top" align="center">
            <table width="560" border="0" cellspacing="0" cellpadding="0" align="center" class="full-width" style="margin: 0px auto; width: 560px; min-width: 280px; max-width: 90%;" role="presentation">
              <!-- start space -->
              <tr>
                <td valign="top" height="50" style="height: 50px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
              </tr><!-- end space -->
              <tr>
                <td valign="top" align="center">
                  <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" style="margin: 0px auto; min-width: 100%;" role="presentation">
                    <tr>
                      <td valign="top" align="center">
                        <table width="auto" align="center" border="0" cellspacing="0" cellpadding="0" style="margin: 0px auto;mso-table-lspace:0pt; mso-table-rspace:0pt;" role="presentation">
                          <tr>
                            <td align="center" valign="top" width="200" style="width: 200px; line-height: 0px;"> <a href="http://localhost:3000/public/index.html" style="font-size: inherit; border-style: none; text-decoration: none !important;" border="0"><img src="https://res.cloudinary.com/fenixsorbil/image/upload/v1564173689/Assets/logo_u1mpzc.png" width="200" style="max-width: 200px; display: block !important; width: 200px; height: auto;" alt="icon-logo" border="0" hspace="0" vspace="0" height="auto"></a></td>
                          </tr><!-- start space -->
                          <tr>
                            <td valign="top" height="20" style="height: 20px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
                          </tr><!-- end space -->
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td valign="top" align="center">
                        <table width="100%" align="center" border="0" cellspacing="0" cellpadding="0" style="margin: 0px auto; min-width: 100%;" role="presentation">
                          <tr>
                            <td align="center" style="font-size: 28px; color: #333333; font-weight: normal; font-family: 'Open Sans', Arial, Helvetica, sans-serif; word-break: break-word; line-height: 1;"><span style="color: #333333; font-style: normal; text-align: center; line-height: 34px; font-size: 28px; font-weight: 400; font-family: 'Open Sans', Arial, Helvetica, sans-serif;">¡Bienvenido a Sorbil <span style="color: #333399; font-style: normal; text-align: center; line-height: 34px; font-size: 28px; font-weight: 700; font-family: 'Open Sans', Arial, Helvetica, sans-serif;">${correo.nombre}</span>!<br><span style="color: #ff900e; font-style: normal; text-align: center; line-height: 34px; font-size: 28px; font-weight: 700; font-family: 'Open Sans', Arial, Helvetica, sans-serif;"><br></span></span></td>
                          </tr><!-- start space -->
                          <tr>
                            <td valign="top" height="1" style="height: 1px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
                          </tr><!-- end space -->
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td valign="top" align="center">
                        <table width="100%" align="center" border="0" cellspacing="0" cellpadding="0" style="margin: 0px auto; min-width: 100%;" role="presentation">
                          <tr>
                            <td align="center" style="font-size: 28px; color: #333333; font-weight: normal; font-family: 'Open Sans', Arial, Helvetica, sans-serif; word-break: break-word; line-height: 1;"><span style="color: #333333; font-style: normal; text-align: center; line-height: 34px; font-size: 28px; font-weight: 400; font-family: 'Open Sans', Arial, Helvetica, sans-serif;"><span style="color: #ff900e; font-style: normal; text-align: center; line-height: 34px; font-size: 28px; font-weight: 700; font-family: 'Open Sans', Arial, Helvetica, sans-serif;"><span style="color: #333399; font-style: normal; text-align: center; line-height: 39px; font-size: 34px; font-weight: 700; font-family: 'Open Sans', Arial, Helvetica, sans-serif;"><span style="font-style: normal; text-align: center; color: #333399; line-height: 39px; font-size: 34px; font-weight: 700; font-family: 'Open Sans', Arial, Helvetica, sans-serif;">Tu librería digital</span></span><br></span></span></td>
                          </tr><!-- start space -->
                          <tr>
                            <td valign="top" height="25" style="height: 25px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
                          </tr><!-- end space -->
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td valign="top" align="center">
                        <table width="100%" align="center" border="0" cellspacing="0" cellpadding="0" style="margin: 0px auto; min-width: 100%;" role="presentation">
                          <tr>
                            <td align="center" style="font-size: 28px; color: #333333; font-weight: normal; font-family: 'Open Sans', Arial, Helvetica, sans-serif; word-break: break-word; line-height: 1;">
                              <div style="text-align: left; font-size: 28px; font-weight: 400; font-family: 'Open Sans', Arial, Helvetica, sans-serif;"><span style="color: #333333; font-style: normal; text-align: center; line-height: 34px; font-size: 28px; font-weight: 400; font-family: 'Open Sans', Arial, Helvetica, sans-serif;"><span style="color: #ff900e; font-style: normal; text-align: center; line-height: 34px; font-size: 28px; font-weight: 700; font-family: 'Open Sans', Arial, Helvetica, sans-serif;"><span style="color: #808080; font-style: normal; text-align: center; line-height: 24px; font-size: 14px; font-weight: 700; font-family: 'Open Sans', Arial, Helvetica, sans-serif;">Tu&nbsp;contraseña temporal es: <span style="color: #333399; font-style: normal; text-align: center; line-height: 24px; font-size: 14px; font-weight: 700; font-family: 'Open Sans', Arial, Helvetica, sans-serif;"><span style="font-style: normal; text-align: center; color: #333399; line-height: 24px; font-size: 14px; font-weight: 700; font-family: 'Open Sans', Arial, Helvetica, sans-serif;">${correo.contrasena}</span></span></span><br><span style="color: #000080; font-style: normal; text-align: center; line-height: 24px; font-size: 14px; font-weight: 700; font-family: 'Open Sans', Arial, Helvetica, sans-serif;"><span style="color: #808080; font-style: normal; text-align: center; line-height: 24px; font-size: 14px; font-weight: 700; font-family: 'Open Sans', Arial, Helvetica, sans-serif;">El&nbsp;correo asociado es: <span style="color: #333399; font-style: normal; text-align: center; line-height: 24px; font-size: 14px; font-weight: 700; font-family: 'Open Sans', Arial, Helvetica, sans-serif;"><span style="font-style: normal; text-align: center; color: #333399; line-height: 24px; font-size: 14px; font-weight: 700; font-family: 'Open Sans', Arial, Helvetica, sans-serif;">${correo.correo}</span></span></span><br><span style="color: #000000; font-style: normal; text-align: center; line-height: 24px; font-size: 14px; font-weight: 700; font-family: 'Open Sans', Arial, Helvetica, sans-serif;"><span style="font-style: normal; text-align: center; color: #000000; line-height: 24px; font-size: 14px; font-weight: 700; font-family: 'Open Sans', Arial, Helvetica, sans-serif;">Por favor ingresá al siguiente enlace:</span></span><br><span style="color: #3366ff; font-style: normal; text-align: center; line-height: 24px; font-size: 15px; font-weight: 700; font-family: 'Open Sans', Arial, Helvetica, sans-serif;"><a href="http://localhost:3000/public/views/u-iniciar-sesion-temporal.html" data-mce-href="http://localhost:3000/public/views/u-iniciar-sesion-temporal.html" style="border-style: none; text-decoration: none !important; line-height: 24px; font-size: 15px; font-weight: 700; font-family: 'Open Sans', Arial, Helvetica, sans-serif;" border="0"><span style="color: #3366ff; font-style: normal; text-align: center; line-height: 24px; font-size: 15px; font-weight: 700; font-family: 'Open Sans', Arial, Helvetica, sans-serif;"><span style="font-style: normal; text-align: center; color: #3366ff; line-height: 24px; font-size: 15px; font-weight: 700; font-family: 'Open Sans', Arial, Helvetica, sans-serif;">Iniciá sesión</span></span></a></span><br></span></span></span></div>
                            </td>
                          </tr><!-- start space -->
                          <tr>
                            <td valign="top" height="1" style="height: 1px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
                          </tr><!-- end space -->
                        </table>
                      </td>
                    </tr>
                    <!--start button-->
                    <tr>
                      <td valign="top" align="center">
                        <table width="auto" align="center" border="0" cellspacing="0" cellpadding="0" style="text-align: center; margin: 0px auto;mso-table-lspace:0pt; mso-table-rspace:0pt;" role="presentation">
                          <tr>
                            <!-- start duplicate button -->
                            <!-- end duplicate button -->
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <!--end button-->
                    <!-- start space -->
                    <tr>
                      <td valign="top" height="19" style="height: 19px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
                    </tr><!-- end space -->
                    <!-- start header image -->
                    <tr>
                      <td valign="top" align="center">
                        <table width="100%" align="center" border="0" cellspacing="0" cellpadding="0" style="margin: 0px auto; min-width: 100%;" role="presentation">
                          <tr>
                            <td align="center" valign="top" class="image-full-width" width="560" style="width: 560px; line-height: 0px;"> <a href="http://localhost:3000/public/index.html" style="font-size: inherit; border-style: none; text-decoration: none !important;" border="0"><img src="https://res.cloudinary.com/fenixsorbil/image/upload/v1564174468/Assets/undraw_studying_s3l7-_1_mw3doo.png" width="560" style="height: auto; display: block !important; width: 100%; max-width: 560px; min-width: 100%;" alt="header-image" border="0" hspace="0" vspace="0" height="auto"></a></td>
                          </tr><!-- start space -->
                          <tr>
                            <td valign="top" height="20" style="height: 20px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
                          </tr><!-- end space -->
                        </table>
                      </td>
                    </tr><!-- end header image -->
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table><!-- end container -->
    </td>
  </tr><!-- END LAYOUT-3 ( HEADER / TEXT / BACKGROUND-IMAGE ) -->
  <!--START LAYOUT-7 ( 3-COL IMAGE / TEXT )  -->
  <tr>
    <td align="center" valign="top" style="background-color: #F3F5F7;" bgcolor="#f3f5f7">
      <!-- start container -->
      <table width="600" align="center" border="0" cellspacing="0" cellpadding="0" class="full-width" style="background-color: #f3f5f7; margin: 0px auto; width: 600px; min-width: 320px; max-width: 90%;" role="presentation" bgcolor="#f3f5f7">
        <tr>
          <td valign="top">
            <table width="560" align="center" border="0" cellspacing="0" cellpadding="0" style="margin: 0px auto; width: 560px; min-width: 280px; max-width: 90%;" class="full-width" role="presentation">
              <!-- start space -->
              <tr>
                <td valign="top" height="2" style="height: 2px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
              </tr><!-- end space -->
              <!-- start content -->
              <tr>
                <td valign="top">
                  <table width="100%" align="center" border="0" cellspacing="0" cellpadding="0" style="margin: 0px auto; min-width: 100%;" role="presentation"></table>
                </td>
              </tr><!-- end content -->
              <!-- start space -->
              <tr>
                <td valign="top" height="20" style="height: 20px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
              </tr><!-- end space -->
              <!-- start content container-->
              <tr>
                <td valign="top">
                  <table width="100%" align="center" border="0" cellpadding="0" cellspacing="0" style="margin: 0px auto; min-width: 100%;" role="presentation">
                    <tr class="row" style="display: flex;">
                      <th valign="top" class="full-block" style="display: table; margin: 0px auto;">
                        <table width="170" align="left" border="0" cellpadding="0" cellspacing="0" class="full-width left" style="max-width: 170px; background-color: #f3f5f7; min-width: 100%;" role="presentation" bgcolor="#f3f5f7">
                          <tr>
                            <td valign="top" style="padding:5px;">
                              <table width="100%" align="center" border="0" cellpadding="0" cellspacing="0" style="margin: 0px auto; min-width: 100%;" role="presentation">
                                <tr>
                                  <td align="center" valign="top" class="image-full-width" width="160" style="width: 160px;"> <a href="http://localhost:3000/public/index.html" style="text-decoration: none !important; font-size: inherit; border-style: none;" border="0"> <img src="https://res.cloudinary.com/fenixsorbil/image/upload/v1564967630/enllamas_k8kvdo.jpg" width="160" style="max-width: 160px; width: 160px; height: 240px; display: block !important; min-width: 100%;" alt="set3-image1" height="240"></a> </td>
                                </tr><!-- start space -->
                                <tr>
                                  <td valign="top" height="1" style="height: 1px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
                                </tr><!-- end space -->
                              </table>
                            </td>
                          </tr>
                        </table>
                      </th>
                      <th valign="top" class="full-block" style="display: table; margin: 0px auto;">
                        <table width="25" border="0" cellpadding="0" cellspacing="0" align="left" class="full-width left" style="max-width: 25px; border-spacing: 0px; min-width: 100%;" role="presentation">
                          <tr>
                            <td height="30" width="25" style="border-collapse: collapse; height: 30px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
                          </tr>
                        </table>
                      </th>
                      <th valign="top" class="full-block" style="display: table; margin: 0px auto;">
                        <table width="170" align="left" border="0" cellpadding="0" cellspacing="0" class="full-width left" style="max-width: 170px; background-color: #f3f5f7; min-width: 100%;" role="presentation" bgcolor="#f3f5f7">
                          <tr>
                            <td valign="top" style="padding:5px;">
                              <table width="100%" align="center" border="0" cellpadding="0" cellspacing="0" style="margin: 0px auto; min-width: 100%;" role="presentation">
                                <tr>
                                  <td align="center" valign="top" class="image-full-width" width="160" style="width: 160px;"> <a href="http://localhost:3000/public/index.html" style="text-decoration: none !important; font-size: inherit; border-style: none;" border="0"> <img src="https://res.cloudinary.com/fenixsorbil/image/upload/v1564964879/eldiariodegreg_pymyn8.jpg" width="160" style="max-width: 160px; height: 240px; display: block !important; min-width: 100%;" alt="set3-image2" height="240"></a> </td>
                                </tr><!-- start space -->
                                <tr>
                                  <td valign="top" height="2" style="height: 2px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
                                </tr><!-- end space -->
                              </table>
                            </td>
                          </tr>
                        </table>
                      </th>
                      <th valign="top" class="full-block" style="display: table; margin: 0px auto;">
                        <table width="25" border="0" cellpadding="0" cellspacing="0" align="left" class="full-width left" style="max-width: 25px; border-spacing: 0px; min-width: 100%;" role="presentation">
                          <tr>
                            <td height="30" width="25" style="border-collapse: collapse; height: 30px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
                          </tr>
                        </table>
                      </th>
                      <th valign="top" class="full-block" style="display: table; margin: 0px auto;">
                        <table width="170" align="right" border="0" cellpadding="0" cellspacing="0" class="full-width right" style="max-width: 170px; background-color: #f3f5f7; min-width: 100%;" role="presentation" bgcolor="#f3f5f7">
                          <tr>
                            <td valign="top" style="padding:5px;">
                              <table width="100%" align="center" border="0" cellpadding="0" cellspacing="0" style="margin: 0px auto; min-width: 100%;" role="presentation">
                                <tr>
                                  <td align="center" valign="top" class="image-full-width" width="160" style="width: 160px;"> <a href="http://localhost:3000/public/index.html" style="text-decoration: none !important; font-size: inherit; border-style: none;" border="0"> <img src="https://res.cloudinary.com/fenixsorbil/image/upload/v1564985265/9_wxhua1.jpg" width="160" style="max-width: 160px; width: 160px; height: 240px; display: block !important; min-width: 100%;" alt="set3-image3" height="240"></a> </td>
                                </tr><!-- start space -->
                                <tr>
                                  <td valign="top" height="1" style="height: 1px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
                                </tr><!-- end space -->
                              </table>
                            </td>
                          </tr>
                        </table>
                      </th>
                    </tr>
                  </table>
                </td>
              </tr><!-- end content container-->
              <!-- start space -->
              <tr>
                <td valign="top" height="29" style="height: 29px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
              </tr><!-- end space -->
            </table>
          </td>
        </tr>
      </table><!-- end container -->
    </td>
  </tr>
  <!--END LAYOUT-7 ( 3-COL IMAGE / TEXT )   -->
  <!-- START LAYOUT-3 ( 3-COL ICON-IMAGE / TEXT ) -->
  <tr>
    <td valign="top" align="center" style="background-color: #F3F5F7;" bgcolor="#f3f5f7">
      <!-- start container -->
      <table width="600" align="center" border="0" cellspacing="0" cellpadding="0" class="full-width" style="background-color: #f3f5f7; margin: 0px auto; width: 600px; min-width: 320px; max-width: 90%;" role="presentation" bgcolor="#f3f5f7">
        <tr>
          <td valign="top" height="1" style="height: 1px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
        </tr><!-- start heading text -->
        <tr>
          <td valign="top" align="center">
            <table width="560" align="center" border="0" cellpadding="0" cellspacing="0" class="full-width" style="margin: 0px auto; width: 560px; min-width: 280px; max-width: 90%;" role="presentation">
              <!-- start space -->
              <tr>
                <td valign="top" height="1" style="height: 1px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
              </tr><!-- end space -->
              <!-- start title -->
              <!-- end title -->
              <!-- start content -->
              <!-- end content -->
            </table>
          </td>
        </tr><!-- end heading text -->
        <!-- start 3-col -->
        <!-- end 3-col -->
        <!-- start 3-col -->
        <!-- end 3-col -->
        <!-- start space -->
        <tr>
          <td valign="top" height="15" style="height: 15px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
        </tr><!-- end space -->
        <tr>
          <td valign="top">
            <table width="560" align="center" border="0" cellpadding="0" cellspacing="0" class="full-width" style="margin: 0px auto; width: 560px; min-width: 280px; max-width: 90%;" role="presentation">
              <!--start button-->
              <tr>
                <td valign="top">
                  <table width="auto" border="0" align="center" cellpadding="0" cellspacing="0" style="margin: 0px auto;mso-table-lspace:0pt; mso-table-rspace:0pt;" role="presentation">
                    <tr>
                      <!-- start duplicate button -->
                      <td class="full-block" valign="top" style="padding-top:10px; padding-bottom:10px; padding-left:5px; padding-right:5px;">
                        <table width="auto" border="0" align="center" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 5px; border: 1px solid rgb(255, 144, 14); margin: 0px auto;mso-table-lspace:0pt; mso-table-rspace:0pt;" role="presentation" bgcolor="#ffffff">
                          <tr>
                            <td width="auto" align="center" valign="middle" height="40" style="font-size: 14px; color: #ff900e; font-weight: normal; font-family: 'Open Sans', Arial, Helvetica, sans-serif; word-break: break-word; background-clip: padding-box; padding-left: 24px; padding-right: 24px; line-height: 1;"><a data-mce-href="http://localhost:3000/public/index.html" href="http://localhost:3000/public/index.html" style="border-style: none; text-decoration: none !important; line-height: 24px; font-size: 14px; font-weight: 400; font-family: 'Open Sans', Arial, Helvetica, sans-serif;" border="0"><span style="color: #ff900e; font-style: normal; text-align: center; line-height: 24px; font-size: 14px; font-weight: 700; font-family: 'Open Sans', Arial, Helvetica, sans-serif;"><span style="font-style: normal; text-align: center; color: #ff900e; line-height: 24px; font-size: 14px; font-weight: 700; font-family: 'Open Sans', Arial, Helvetica, sans-serif;"> Ver más</span></span></a></td>
                          </tr>
                        </table>
                      </td> <!-- end duplicate button -->
                    </tr>
                  </table>
                </td>
              </tr>
              <!--end button-->
            </table>
          </td>
        </tr><!-- start space -->
        <tr>
          <td valign="top" height="33" style="height: 33px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
        </tr><!-- end space -->
      </table><!-- end container -->
    </td>
  </tr><!-- END LAYOUT-3 ( 3-COL ICON-IMAGE / TEXT ) -->
  <!-- START LAYOUT-10 ( UNSUBSCRIBE )-->
  <tr>
    <td valign="top" align="center" style="background-color: #1F3C88;" bgcolor="#1f3c88">
      <!-- start container -->
      <table width="600" align="center" border="0" cellspacing="0" cellpadding="0" style="background-color: #1f3c88; margin: 0px auto; width: 600px; min-width: 320px; max-width: 90%;" class="full-width" role="presentation" bgcolor="#1f3c88">
        <tr>
          <td valign="top" align="center">
            <table width="560" align="center" border="0" cellpadding="0" cellspacing="0" class="full-width" style="table-layout: fixed; margin: 0px auto; width: 560px; min-width: 280px; max-width: 90%;" role="presentation">
              <!-- start space -->
              <tr>
                <td valign="top" height="20" style="height: 20px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
              </tr><!-- end space -->
              <tr class="row" style="display: flex;">
                <th valign="middle" class="full-block" style="display: table; margin: auto;">
                  <table width="244" align="left" border="0" cellspacing="0" cellpadding="0" class="full-width" role="presentation" style="min-width: 100%;">
                    <tr>
                      <td align="center" style="font-size: 14px; color: #ffffff; font-weight: normal; font-family: 'Open Sans', Arial, Helvetica, sans-serif; word-break: break-word; line-height: 1;"><span style="color: #ffffff; text-decoration: none; word-break: break-word; font-style: normal; text-align: center; line-height: 24px; font-size: 14px; font-weight: 400; font-family: 'Open Sans', Arial, Helvetica, sans-serif;"><span style="color: #ffffff; word-break: break-word; font-style: normal; text-align: center; line-height: 24px; font-size: 14px; font-weight: 400; font-family: 'Open Sans', Arial, Helvetica, sans-serif;"> <a href="#" style="color: #ffffff; word-break: break-word; text-decoration: none !important; border-style: none; line-height: 24px; font-size: 14px; font-weight: 400; font-family: 'Open Sans', Arial, Helvetica, sans-serif;" data-mce-href="#" border="0"><span style="color: #ffffff; font-style: normal; text-align: center; line-height: 24px; font-size: 14px; font-weight: 400; font-family: 'Open Sans', Arial, Helvetica, sans-serif;"><span style="font-style: normal; text-align: center; color: #ffffff; line-height: 24px; font-size: 14px; font-weight: 400; font-family: 'Open Sans', Arial, Helvetica, sans-serif;">Sorbil © 2019.&nbsp;</span></span></a> </span></span></td>
                    </tr>
                  </table>
                </th>
                <th valign="middle" class="full-block" style="display: table; margin: auto; width: 40%;" width="40%">
                  <table width="20" border="0" cellpadding="0" cellspacing="0" align="left" class="full-width" style="height: 1px; border-spacing: 0px; min-width: 100%;" role="presentation">
                    <tr>
                      <td height="1" class="h-20" style="border-collapse: collapse; height: 1px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
                    </tr>
                  </table>
                </th>
                <th valign="middle" class="full-block" style="display: table; margin: auto;">
                  <table width="87" align="right" border="0" cellspacing="0" cellpadding="0" class="full-width" role="presentation" style="min-width: 100%;">
                    <tr>
                      <td align="center" style="font-size: 14px; color: #ffffff; font-weight: normal; font-family: 'Open Sans', Arial, Helvetica, sans-serif; word-break: break-word; line-height: 1;"> <span style="text-decoration: none; color: #ffffff; word-break: break-word; font-style: normal; text-align: center; line-height: 24px; font-size: 14px; font-weight: 700; font-family: 'Open Sans', Arial, Helvetica, sans-serif;"> <a href="#" style="color: #ffffff; word-break: break-word; text-decoration: none !important; border-style: none; line-height: 24px; font-size: 14px; font-weight: 700; font-family: 'Open Sans', Arial, Helvetica, sans-serif;" border="0"><span style="color: #ffffff; font-style: normal; text-align: center; line-height: 24px; font-size: 14px; font-weight: 700; font-family: 'Open Sans', Arial, Helvetica, sans-serif;"></span></a><a href="http://localhost:3000/public/views/fenix.html" data-mce-href="http://localhost:3000/public/views/fenix.html" style="border-style: none; text-decoration: none !important; line-height: 24px; font-size: 14px; font-weight: 700; font-family: 'Open Sans', Arial, Helvetica, sans-serif;" border="0"></a><a href="http://localhost:3000/public/views/fenix.html" data-mce-href="http://localhost:3000/public/views/fenix.html" style="border-style: none; text-decoration: none !important; line-height: 24px; font-size: 14px; font-weight: 700; font-family: 'Open Sans', Arial, Helvetica, sans-serif;" border="0"></a>Fénix</span> </td>
                    </tr>
                  </table>
                </th>
              </tr><!-- start space -->
              <tr>
                <td valign="top" height="20" style="height: 20px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
              </tr><!-- end space -->
            </table>
          </td>
        </tr>
      </table><!-- end container -->
    </td>
  </tr><!-- END LAYOUT-10 ( UNSUBSCRIBE )-->
</table></body>
</html>`
				};
				transporter.sendMail(mailOptions, function (error, info) {
					if (error) {
						console.log(error);
					} else {
						console.logo('Correo enviado' + info.response);
					}
				})
				res.json({ success: true, msg: 'El usuario se habilitó con éxito' });
			}
		}
	)
});

router.post('/modificar-usuario', function (req, res) {
	let body = req.body;

	Usuario.findByIdAndUpdate(body._id, {
		$set: req.body
	},
		function (error) {
			if (error) {
				res.json({ success: false, msg: 'No se pudo modificar el usuario' });
			} else {
				res.json({ success: true, msg: 'El usuario se modificó con éxito' });
			}
		}
	)
});

router.post('/modificar-contrasena-usuario', function (req, res) {
	let body = req.body;

	Usuario.findByIdAndUpdate(body._id, {
		$set: {
			contrasena: req.body.contrasena
		}
	},
		function (error) {

			if (error) {
				res.json({ success: false, msg: 'No se pudo modificar la contraseña' });
			} else {
				res.json({ success: true, msg: 'La contraseña se modificó con éxito' });
			}
		}
	)
});


router.post('/eliminar-usuario', function (req, res) {
	let body = req.body;

	Usuario.findByIdAndRemove(body._id,
		function (error) {
			if (error) {
				res.json({ success: false, msg: 'No se pudo borrar el usuario' });
			} else {
				res.json({ success: true, msg: 'El usuario se borró con éxito' });
			}
		}
	)
});

router.post('/modificar-tarjetas', function (req, res) {
	let body = req.body;

	Usuario.findByIdAndUpdate(body._id, {
		$set: body.datos
	},
		function (error) {
			if (error) {
				res.json({ success: false, msg: 'No se pudo modificar el contacto' });
			} else {
				res.json({ success: true, msg: 'El contacto se modificó con éxito' });
			}
		}
	)
});

router.post('/modificar-estado-tarjetas', function (req, res) {
	let body = req.body;

	Usuario.findByIdAndUpdate(body._id, {
		$set: {
			'tarjetas': req.body.datos
		}
	},
		function (error) {
			if (error) {
				res.json({ success: false, msg: 'No se pudo modificar la tarjeta' });
			} else {
				res.json({ success: true, msg: 'La tarjeta se modificó con éxito' });
			}
		}
	)
});

router.post('/eliminar-tarjetas', function (req, res) {
	let body = req.body;

	Usuario.findByIdAndUpdate(body._id, {
		$pull: {
			tarjetas: {
				_id: req.body.idlibro
			}
		}
	},
		function (error) {
			if (error) {
				res.json({ success: false, msg: 'No se pudo modificar la tarjeta' });
			} else {
				res.json({ success: true, msg: 'La tarjeta se modificó con éxito' });
			}
		}
	)
});

router.post('/recuperar-contrasena', function (req, res) {
  
	Usuario.findOne({ correo: req.body.correo }).then(

		function (usuario) {
			if (usuario) {
				if (usuario) {
					res.json({
						success: true,
						msg: 'El usuario existe',
						usuario: usuario,										
					});
					let mailOptions = {
						from: 'fenixsorbil@gmail.com',
						to: usuario.correo,
						subject: 'Sorbil Recuperación de contraseña',
						html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
            <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
            <meta name="format-detection" content="date=no">
            <meta name="format-detection" content="telephone=no"/>
            <meta name="x-apple-disable-message-reformatting">
            <title>Recuperar</title>
            
              <!--[if mso]>
            
              <style>
            
              * {font-family: Arial, Helvetica, sans-serif !important;}
            
              </style>
            
              <![endif]-->
            
               <!--[if !mso]><!-->
            
              <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700,300&subset=latin,cyrillic,greek" rel="stylesheet" type="text/css">
            
              <!--<![endif]-->
            
              <style type="text/css">
            
              
                
                .ReadMsgBody { width: 100%; background-color: #ffffff;}
                .ExternalClass {width: 100%; background-color: #ffffff;}
                .ExternalClass, .ExternalClass p, .ExternalClass span,
                .ExternalClass font, .ExternalClass td, .ExternalClass tbody {line-height:100%;}
                #outlook a { padding:0;}
                html,body {margin: 0 auto !important; padding: 0 !important; height: 100% !important; width: 100% !important;}
                * {-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;}
                table,td {mso-table-lspace: 0pt !important; mso-table-rspace: 0pt !important;}
                table {border-spacing: 0 !important;}
                table table table {table-layout: auto;}
                a,span a{text-decoration: none !important;}
                .yshortcuts, .yshortcuts a, .yshortcuts a:link,.yshortcuts a:visited,
                .yshortcuts a:hover, .yshortcuts a span { text-decoration: none !important; border-bottom: none !important;}
            
                /*mailChimp class*/
                ul{padding-left:10px; margin:0;}
                .default-edit-image{height:20px;}
                .tpl-repeatblock {padding: 0px !important; border: 1px dotted rgba(0,0,0,0.2);}
                .tpl-content {padding:0px !important;}
            
                /* Start Old CSS */
                @media only screen and (max-width: 640px){
                .container{width:95%!important; max-width:95%!important; min-width:95%!important;
                padding-left:15px!important; padding-right:15px!important; text-align: center!important; clear: both;}
                .full-width{width:100%!important; max-width:100%!important; min-width:100%!important; clear: both;}
                .full-width-center {width: 100%!important; max-width:100%!important;  text-align: center!important; clear: both; margin:0 auto; float:none;}
                .force-240-center{width:240px !important; clear: both; margin:0 auto; float:none;}
                .auto-center {width: auto!important; max-width:100%!important;  text-align: center!important; clear: both; margin:0 auto; float:none;}
                .auto-center-all{width: auto!important; max-width:75%!important;  text-align: center!important; clear: both; margin:0 auto; float:none;}
                .auto-center-all * {width: auto!important; max-width:100%!important;  text-align: center!important; clear: both; margin:0 auto; float:none;}
                .col-3,.col-3-not-full{width:30.35%!important; max-width:100%!important;}
                .col-2{width:47.3%!important; max-width:100%!important;}
                .full-block{display:block !important; clear: both;}
                /* image */
                .image-full-width img{width:100% !important; height:auto !important; max-width:100% !important;}
                /* helper */
                .space-w-20{width:3.57%!important; max-width:20px!important; min-width:3.5% !important;}
                .space-w-20 td:first-child{width:3.5%!important; max-width:20px!important; min-width:3.5% !important;}
                .space-w-25{width:4.45%!important; max-width:25px!important; min-width:4.45% !important;}
                .space-w-25 td:first-child{width:4.45%!important; max-width:25px!important; min-width:4.45% !important;}
                .space-w-30 td:first-child{width:5.35%!important; max-width:30px!important; min-width:5.35% !important;}
                .fix-w-20{width:20px!important; max-width:20px!important; min-width:20px!important;}
                .fix-w-20 td:first-child{width:20px!important; max-width:20px!important; min-width:20px !important;}
                .h-10{display:block !important;  height:10px !important;}
                .h-20{display:block !important;  height:20px !important;}
                .h-30{display:block !important; height:30px !important;}
                .h-40{display:block !important;  height:40px !important;}
                .remove-640{display:none !important;}
                .text-left{text-align:left !important;}
                .clear-pad{padding:0 !important;}
                }
                @media only screen and (max-width: 479px){
                .container{width:95%!important; max-width:95%!important; min-width:124px!important;
                padding-left:15px!important; padding-right:15px!important; text-align: center!important; clear: both;}
                .full-width,.full-width-479{width:100%!important; max-width:100%!important; min-width:124px!important; clear: both;}
                .full-width-center {width: 100%!important; max-width:100%!important; min-width:124px!important; text-align: center!important; clear: both; margin:0 auto; float:none;}
                .auto-center-all{width: 100%!important; max-width:100%!important;  text-align: center!important; clear: both; margin:0 auto; float:none;}
                .auto-center-all * {width: auto!important; max-width:100%!important;  text-align: center!important; clear: both; margin:0 auto; float:none;}
                .col-3{width:100%!important; max-width:100%!important; text-align: center!important; clear: both;}
                .col-3-not-full{width:30.35%!important; max-width:100%!important; }
                .col-2{width:100%!important; max-width:100%!important; text-align: center!important; clear: both;}
                .full-block-479{display:block !important; clear: both; padding-top:10px; padding-bottom:10px; }
                /* image */
                .image-full-width img{width:100% !important; height:auto !important; max-width:100% !important; min-width:124px !important;}
                .image-min-80 img{width:100% !important; height:auto !important; max-width:100% !important; min-width:80px !important;}
                .image-min-100 img{width:100% !important; height:auto !important; max-width:100% !important; min-width:100px !important;}
                /* halper */
                .space-w-20{width:100%!important; max-width:100%!important; min-width:100% !important;}
                .space-w-20 td:first-child{width:100%!important; max-width:100%!important; min-width:100% !important;}
                .space-w-25{width:100%!important; max-width:100%!important; min-width:100% !important;}
                .space-w-25 td:first-child{width:100%!important; max-width:100%!important; min-width:100% !important;}
                .space-w-30{width:100%!important; max-width:100%!important; min-width:100% !important;}
                .space-w-30 td:first-child{width:100%!important; max-width:100%!important; min-width:100% !important;}
                .remove-479{display:none !important;}
                img{max-width:280px !important;}
                .resize-font, .resize-font *{font-size: 37px !important; line-height: 48px !important;}
                }
                /* End Old CSS */
            
                @media only screen and (max-width:640px){
                .full-width,.container{width:95%!important; float:none!important; min-width:95%!important; max-width:95%!important; margin:0 auto!important; padding-left:15px; padding-right:15px; text-align: center!important; clear: both;}
                #mainStructure, #mainStructure .full-width .full-width,table .full-width .full-width, .container .full-width{width:100%!important; float:none!important; min-width:100%!important; max-width:100%!important; margin:0 auto!important; clear: both; padding-left:0; padding-right:0;}
                .no-pad{padding:0!important;}
                .full-block{display:block!important;}
                .image-full-width,
                .image-full-width img{width:100%!important; height:auto!important; max-width:100%!important; min-width: 100px !important;}
                .full-width.fix-800{min-width:auto!important;}
                .remove-block{display:none !important; padding-top:0px; padding-bottom:0px;}
                .pad-lr-20{padding-left:20px!important; padding-right:20px!important;}
                .row{display:table-row!important;}
                }
            
                @media only screen and (max-width:480px){
                .full-width,.container{width:95%!important; float:none!important; min-width:95%!important; max-width:95%!important; margin:0 auto!important; padding-left:15px; padding-right:15px; text-align: center!important; clear: both;}
                #mainStructure, #mainStructure .full-width .full-width,table .full-width .full-width,.container .full-width{width:100%!important; float:none!important; min-width:100%!important; max-width:100%!important; margin:0 auto!important; clear: both; padding-left:0; padding-right:0;}
                .no-pad{padding:0!important;}
                .full-block{display:block!important;}
                .image-full-width,
                .image-full-width img{width:100%!important; height:auto!important; max-width:100%!important; min-width: 100px !important;}
                .full-width.fix-800{min-width:auto!important;}
                .remove-block{display:none !important; padding-top:0px; padding-bottom:0px;}
                .pad-lr-20{padding-left:20px!important; padding-right:20px!important;}
                .row{display:table-row!important;}
                }
            
                td ul{list-style: initial; margin:0; padding-left:20px;}
            
              body{background-color:#ffffff; margin: 0 auto !important; height:auto!important;} #preview-template #mainStructure{padding:20px 0px 60px 0px!important;} .default-edit-image{height:20px;} tr.tpl-repeatblock , tr.tpl-repeatblock > td{ display:block !important;} .tpl-repeatblock {padding: 0px !important;border: 1px dotted rgba(0,0,0,0.2); }
            
              @media only screen and (max-width: 640px){ .full-block{display:table !important; padding-top:0px; padding-bottom:0px;} .row{display:table-row!important;} .image-100-percent img{ width:100%!important; height: auto !important; max-width: 100% !important; min-width: 124px !important;}}
            
              @media only screen and (max-width: 480px){ .full-block{display:table !important; padding-top:0px; padding-bottom:0px;} .row{display:table-row!important;}}
            
            
              *[x-apple-data-detectors], .unstyle-auto-detected-links *,
            
              .aBn{border-bottom: 0 !important; cursor: default !important;color: inherit !important; text-decoration: none !important;font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important;line-height: inherit !important;}
            
              .im {color: inherit !important;}
            
              .a6S {display: none !important; opacity: 0.01 !important;}
            
              img.g-img + div {display: none !important;}
            
              img {height: auto !important; line-height: 100%; outline: none; text-decoration: none !important; -ms-interpolation-mode:bicubic;}
            
              a img{ border: 0 !important;}
            
              a:active{color:initial } a:visited{color:initial }
            
              span a ,a {color:inherit; text-decoration: none !important;}
            
              .tpl-content{padding:0 !important;}
            
              table td {border-collapse:unset;}
            
              table p {margin:0;}
            
              table,img{min-width:0!important;}
            
              #mainStructure{padding:0 !important;}
            
              .row th{display:table-cell;}
            
              .row{display:flex;}
            
              </style>
            
              <!--[if mso]>
            
              <style type="text/css">
            
              body { font-size: 0; line-height: 0; }
            
              table,tr { font-size:1px; mso-line-height-alt:0; line-height:0; mso-margin-top-alt:1px;}
            
              body,table,td,span,a,font{font-family: Arial, Helvetica, sans-serif!important; mso-line-height-rule:exactly; -ms-text-size-adjust:100%; -webkit-text-size-adjust:100%;}
            
              a img{ border: 0 !important;}
            
              a{text-decoration: none !important;}
            
              table td ,table th{display:table-cell!important;}
            
              table,img{min-width:0!important;}
            
              </style>
            
              <![endif]-->
            
              <!--[if gte mso 9]><xml>
            
              <o:OfficeDocumentSettings>
            
              <o:AllowPNG/>
            
              <o:PixelsPerInch>96</o:PixelsPerInch>
            
              </o:OfficeDocumentSettings>
            
              </xml><![endif]-->
            
              <!--[if mso]>
            
              <xml xmlns:w="urn:schemas-microsoft-com:office:word">
            
              <w:WordDocument><w:AutoHyphenation/></w:WordDocument>
            
              </xml>
            
              <![endif]-->
            </head>
            <body  style="font-size:12px; width:100%; height:100%;">
            <table id="mainStructure" class="full-width" width="800" align="center" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; max-width: 800px; outline: rgb(239, 239, 239) solid 1px; box-shadow: rgb(224, 224, 224) 0px 0px 30px 5px; margin: 0px auto;" bgcolor="#ffffff">
              <!-- START LAYOUT-3 ( HEADER / TEXT / BACKGROUND-IMAGE ) -->
              <tr>
                <td valign="top" align="center" style="background-color: #F3F5F7;" bgcolor="#f3f5f7">
                  <!-- start container -->
                  <table width="600" align="center" border="0" cellspacing="0" cellpadding="0" class="full-width" style="background-color: #f3f5f7; margin: 0px auto; width: 600px; min-width: 320px; max-width: 90%;" role="presentation" bgcolor="#f3f5f7">
                    <tr>
                      <td valign="top" align="center">
                        <table width="560" border="0" cellspacing="0" cellpadding="0" align="center" class="full-width" style="margin: 0px auto; width: 560px; min-width: 280px; max-width: 90%;" role="presentation">
                          <!-- start space -->
                          <tr>
                            <td valign="top" height="50" style="height: 50px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
                          </tr><!-- end space -->
                          <tr>
                            <td valign="top" align="center">
                              <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" style="margin: 0px auto; min-width: 100%;" role="presentation">
                                <tr>
                                  <td valign="top" align="center">
                                    <table width="auto" align="center" border="0" cellspacing="0" cellpadding="0" style="margin: 0px auto;mso-table-lspace:0pt; mso-table-rspace:0pt;" role="presentation">
                                      <tr>
                                        <td align="center" valign="top" width="200" style="width: 200px; line-height: 0px;"> <a href="http://localhost:3000/public/index.html" style="font-size: inherit; border-style: none; text-decoration: none !important;" border="0"><img src="https://res.cloudinary.com/fenixsorbil/image/upload/v1564173689/Assets/logo_u1mpzc.png" width="200" style="max-width: 200px; height: auto; display: block !important;" alt="icon-logo" border="0" hspace="0" vspace="0" height="auto"></a></td>
                                      </tr><!-- start space -->
                                      <tr>
                                        <td valign="top" height="20" style="height: 20px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
                                      </tr><!-- end space -->
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td valign="top" align="center">
                                    <table width="100%" align="center" border="0" cellspacing="0" cellpadding="0" style="margin: 0px auto; min-width: 100%;" role="presentation">
                                      <tr>
                                        <td align="center" style="font-size: 28px; color: #333333; font-weight: normal; font-family: 'Open Sans', Arial, Helvetica, sans-serif; word-break: break-word; line-height: 1;"><span style="color: #333333; font-style: normal; text-align: center; line-height: 34px; font-size: 28px; font-weight: 400; font-family: 'Open Sans', Arial, Helvetica, sans-serif;">Modificación de la contraseña<br><span style="color: #ff900e; font-style: normal; text-align: center; line-height: 34px; font-size: 28px; font-weight: 700; font-family: 'Open Sans', Arial, Helvetica, sans-serif;"><br></span></span></td>
                                      </tr><!-- start space -->
                                      <tr>
                                        <td valign="top" height="1" style="height: 1px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
                                      </tr><!-- end space -->
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td valign="top" align="center">
                                    <table width="100%" align="center" border="0" cellspacing="0" cellpadding="0" style="margin: 0px auto; min-width: 100%;" role="presentation">
                                      <tr>
                                        <td align="center" style="font-size: 28px; color: #333333; font-weight: normal; font-family: 'Open Sans', Arial, Helvetica, sans-serif; word-break: break-word; line-height: 1;"><span style="color: #333333; font-style: normal; text-align: center; line-height: 34px; font-size: 28px; font-weight: 400; font-family: 'Open Sans', Arial, Helvetica, sans-serif;"><span style="color: #ff900e; font-style: normal; text-align: center; line-height: 34px; font-size: 28px; font-weight: 700; font-family: 'Open Sans', Arial, Helvetica, sans-serif;"><span style="color: #000000; font-style: normal; text-align: center; line-height: 24px; font-size: 14px; font-weight: 700; font-family: 'Open Sans', Arial, Helvetica, sans-serif;">Ingresá al siguiente enlace para modificar tu contraseña</span><br></span></span></td>
                                      </tr><!-- start space -->
                                      <tr>
                                        <td valign="top" height="20" style="height: 20px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
                                      </tr><!-- end space -->
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td valign="top" align="center">
                                    <table width="100%" align="center" border="0" cellspacing="0" cellpadding="0" style="margin: 0px auto; min-width: 100%;" role="presentation">
                                      <tr>
                                        <td align="center" style="font-size: 28px; color: #333333; font-weight: normal; font-family: 'Open Sans', Arial, Helvetica, sans-serif; word-break: break-word; line-height: 1;">
                                          <div style="text-align: left; font-size: 28px; font-weight: 400; font-family: 'Open Sans', Arial, Helvetica, sans-serif;"><span style="color: #333333; font-style: normal; text-align: center; line-height: 34px; font-size: 28px; font-weight: 400; font-family: 'Open Sans', Arial, Helvetica, sans-serif;"><span style="color: #ff900e; font-style: normal; text-align: center; line-height: 34px; font-size: 28px; font-weight: 700; font-family: 'Open Sans', Arial, Helvetica, sans-serif;"><span style="color: #808080; font-style: normal; text-align: center; line-height: 24px; font-size: 14px; font-weight: 700; font-family: 'Open Sans', Arial, Helvetica, sans-serif;"><span style="font-style: normal; text-align: center; color: #808080; line-height: 24px; font-size: 14px; font-weight: 700; font-family: 'Open Sans', Arial, Helvetica, sans-serif;">Tu&nbsp;contraseña es:&nbsp;</span></span><br><span style="color: #000080; font-style: normal; text-align: center; line-height: 24px; font-size: 14px; font-weight: 700; font-family: 'Open Sans', Arial, Helvetica, sans-serif;"><span style="color: #808080; font-style: normal; text-align: center; line-height: 24px; font-size: 14px; font-weight: 700; font-family: 'Open Sans', Arial, Helvetica, sans-serif;"><span style="font-style: normal; text-align: center; color: #808080; line-height: 24px; font-size: 14px; font-weight: 700; font-family: 'Open Sans', Arial, Helvetica, sans-serif;">El&nbsp;correo asociado es:</span></span><br><span style="color: #000000; font-style: normal; text-align: center; line-height: 24px; font-size: 14px; font-weight: 700; font-family: 'Open Sans', Arial, Helvetica, sans-serif;"><span style="font-style: normal; text-align: center; color: #000000; line-height: 24px; font-size: 14px; font-weight: 700; font-family: 'Open Sans', Arial, Helvetica, sans-serif;">Por favor ingresá al siguiente enlace:</span></span><br><span style="color: #3366ff; font-style: normal; text-align: center; line-height: 24px; font-size: 16px; font-weight: 700; font-family: 'Open Sans', Arial, Helvetica, sans-serif;"><a href="http://localhost:3000/public/views/u-recuperar-contrasena.html?_id=${usuario._id}" data-mce-href="http://localhost:3000/public/views/u-recuperar-contrasena.html?_id=${usuario._id}" style="border-style: none; text-decoration: none !important; line-height: 24px; font-size: 16px; font-weight: 700; font-family: 'Open Sans', Arial, Helvetica, sans-serif;" border="0"><span style="color: #3366ff; font-style: normal; text-align: center; line-height: 24px; font-size: 16px; font-weight: 700; font-family: 'Open Sans', Arial, Helvetica, sans-serif;"><span style="font-style: normal; text-align: center; color: #3366ff; line-height: 24px; font-size: 16px; font-weight: 700; font-family: 'Open Sans', Arial, Helvetica, sans-serif;">Modificá tu contraseña</span></span></a></span><br></span></span></span></div>
                                        </td>
                                      </tr><!-- start space -->
                                      <tr>
                                        <td valign="top" height="1" style="height: 1px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
                                      </tr><!-- end space -->
                                    </table>
                                  </td>
                                </tr>
                                <!--start button-->
                                <tr>
                                  <td valign="top" align="center">
                                    <table width="auto" align="center" border="0" cellspacing="0" cellpadding="0" style="text-align: center; margin: 0px auto;mso-table-lspace:0pt; mso-table-rspace:0pt;" role="presentation">
                                      <tr>
                                        <!-- start duplicate button -->
                                        <!-- end duplicate button -->
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                                <!--end button-->
                                <!-- start space -->
                                <tr>
                                  <td valign="top" height="19" style="height: 19px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
                                </tr><!-- end space -->
                                <!-- start header image -->
                                <tr>
                                  <td valign="top" align="center">
                                    <table width="100%" align="center" border="0" cellspacing="0" cellpadding="0" style="margin: 0px auto; min-width: 100%;" role="presentation">
                                      <tr>
                                        <td align="center" valign="top" class="image-full-width" width="560" style="width: 560px; line-height: 0px;"> <a href="http://localhost:3000/public/index.html" style="font-size: inherit; border-style: none; text-decoration: none !important;" border="0"><img src="https://res.cloudinary.com/fenixsorbil/image/upload/v1564174468/Assets/undraw_studying_s3l7-_1_mw3doo.png" width="560" style="height: auto; display: block !important; width: 100%; max-width: 560px; min-width: 100%;" alt="header-image" border="0" hspace="0" vspace="0" height="auto"></a></td>
                                      </tr><!-- start space -->
                                      <tr>
                                        <td valign="top" height="20" style="height: 20px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
                                      </tr><!-- end space -->
                                    </table>
                                  </td>
                                </tr><!-- end header image -->
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table><!-- end container -->
                </td>
              </tr><!-- END LAYOUT-3 ( HEADER / TEXT / BACKGROUND-IMAGE ) -->
              <!--START LAYOUT-7 ( 3-COL IMAGE / TEXT )  -->
              <tr>
                <td align="center" valign="top" style="background-color: #F3F5F7;" bgcolor="#f3f5f7">
                  <!-- start container -->
                  <table width="600" align="center" border="0" cellspacing="0" cellpadding="0" class="full-width" style="background-color: #f3f5f7; margin: 0px auto; width: 600px; min-width: 320px; max-width: 90%;" role="presentation" bgcolor="#f3f5f7">
                    <tr>
                      <td valign="top">
                        <table width="560" align="center" border="0" cellspacing="0" cellpadding="0" style="margin: 0px auto; width: 560px; min-width: 280px; max-width: 90%;" class="full-width" role="presentation">
                          <!-- start space -->
                          <tr>
                            <td valign="top" height="1" style="height: 1px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
                          </tr><!-- end space -->
                          <!-- start content -->
                          <tr>
                            <td valign="top">
                              <table width="100%" align="center" border="0" cellspacing="0" cellpadding="0" style="margin: 0px auto; min-width: 100%;" role="presentation"></table>
                            </td>
                          </tr><!-- end content -->
                          <!-- start space -->
                          <tr>
                            <td valign="top" height="20" style="height: 20px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
                          </tr><!-- end space -->
                          <!-- start content container-->
                          <tr>
                            <td valign="top">
                              <table width="100%" align="center" border="0" cellpadding="0" cellspacing="0" style="margin: 0px auto; min-width: 100%;" role="presentation">
                                <tr class="row" style="display: flex;">
                                  <th valign="top" class="full-block" style="display: table; margin: 0px auto;">
                                    <table width="170" align="left" border="0" cellpadding="0" cellspacing="0" class="full-width left" style="max-width: 170px; background-color: #f3f5f7; min-width: 100%;" role="presentation" bgcolor="#f3f5f7">
                                      <tr>
                                        <td valign="top" style="padding:5px;">
                                          <table width="100%" align="center" border="0" cellpadding="0" cellspacing="0" style="margin: 0px auto; min-width: 100%;" role="presentation">
                                            <tr>
                                              <td align="center" valign="top" class="image-full-width" width="160" style="width: 160px;"> <a href="http://localhost:3000/public/index.html" style="text-decoration: none !important; font-size: inherit; border-style: none;" border="0"> <img src="https://res.cloudinary.com/fenixsorbil/image/upload/v1564967630/enllamas_k8kvdo.jpg" width="160" style="max-width: 160px; width: 160px; height: 240px; display: block !important; min-width: 100%;" alt="set3-image1" height="240"></a> </td>
                                            </tr><!-- start space -->
                                            <tr>
                                              <td valign="top" height="1" style="height: 1px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
                                            </tr><!-- end space -->
                                          </table>
                                        </td>
                                      </tr>
                                    </table>
                                  </th>
                                  <th valign="top" class="full-block" style="display: table; margin: 0px auto;">
                                    <table width="25" border="0" cellpadding="0" cellspacing="0" align="left" class="full-width left" style="max-width: 25px; border-spacing: 0px; min-width: 100%;" role="presentation">
                                      <tr>
                                        <td height="30" width="25" style="border-collapse: collapse; height: 30px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
                                      </tr>
                                    </table>
                                  </th>
                                  <th valign="top" class="full-block" style="display: table; margin: 0px auto;">
                                    <table width="170" align="left" border="0" cellpadding="0" cellspacing="0" class="full-width left" style="max-width: 170px; background-color: #f3f5f7; min-width: 100%;" role="presentation" bgcolor="#f3f5f7">
                                      <tr>
                                        <td valign="top" style="padding:5px;">
                                          <table width="100%" align="center" border="0" cellpadding="0" cellspacing="0" style="margin: 0px auto; min-width: 100%;" role="presentation">
                                            <tr>
                                              <td align="center" valign="top" class="image-full-width" width="160" style="width: 160px;"> <a href="http://localhost:3000/public/index.html" style="text-decoration: none !important; font-size: inherit; border-style: none;" border="0"> <img src="https://res.cloudinary.com/fenixsorbil/image/upload/v1564964879/eldiariodegreg_pymyn8.jpg" width="160" style="max-width: 160px; height: 240px; display: block !important; min-width: 100%;" alt="set3-image2" height="240"></a> </td>
                                            </tr><!-- start space -->
                                            <tr>
                                              <td valign="top" height="2" style="height: 2px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
                                            </tr><!-- end space -->
                                          </table>
                                        </td>
                                      </tr>
                                    </table>
                                  </th>
                                  <th valign="top" class="full-block" style="display: table; margin: 0px auto;">
                                    <table width="25" border="0" cellpadding="0" cellspacing="0" align="left" class="full-width left" style="max-width: 25px; border-spacing: 0px; min-width: 100%;" role="presentation">
                                      <tr>
                                        <td height="30" width="25" style="border-collapse: collapse; height: 30px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
                                      </tr>
                                    </table>
                                  </th>
                                  <th valign="top" class="full-block" style="display: table; margin: 0px auto;">
                                    <table width="170" align="right" border="0" cellpadding="0" cellspacing="0" class="full-width right" style="max-width: 170px; background-color: #f3f5f7; min-width: 100%;" role="presentation" bgcolor="#f3f5f7">
                                      <tr>
                                        <td valign="top" style="padding:5px;">
                                          <table width="100%" align="center" border="0" cellpadding="0" cellspacing="0" style="margin: 0px auto; min-width: 100%;" role="presentation">
                                            <tr>
                                              <td align="center" valign="top" class="image-full-width" width="160" style="width: 160px;"> <a href="http://localhost:3000/public/index.html" style="text-decoration: none !important; font-size: inherit; border-style: none;" border="0"> <img src="https://res.cloudinary.com/fenixsorbil/image/upload/v1564985265/9_wxhua1.jpg" width="160" style="max-width: 160px; width: 160px; height: 240px; display: block !important; min-width: 100%;" alt="set3-image3" height="240"></a> </td>
                                            </tr><!-- start space -->
                                            <tr>
                                              <td valign="top" height="1" style="height: 1px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
                                            </tr><!-- end space -->
                                          </table>
                                        </td>
                                      </tr>
                                    </table>
                                  </th>
                                </tr>
                              </table>
                            </td>
                          </tr><!-- end content container-->
                          <!-- start space -->
                          <tr>
                            <td valign="top" height="29" style="height: 29px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
                          </tr><!-- end space -->
                        </table>
                      </td>
                    </tr>
                  </table><!-- end container -->
                </td>
              </tr>
              <!--END LAYOUT-7 ( 3-COL IMAGE / TEXT )   -->
              <!-- START LAYOUT-3 ( 3-COL ICON-IMAGE / TEXT ) -->
              <tr>
                <td valign="top" align="center" style="background-color: #F3F5F7;" bgcolor="#f3f5f7">
                  <!-- start container -->
                  <table width="600" align="center" border="0" cellspacing="0" cellpadding="0" class="full-width" style="background-color: #f3f5f7; margin: 0px auto; width: 600px; min-width: 320px; max-width: 90%;" role="presentation" bgcolor="#f3f5f7">
                    <tr>
                      <td valign="top" height="1" style="height: 1px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
                    </tr><!-- start heading text -->
                    <tr>
                      <td valign="top" align="center">
                        <table width="560" align="center" border="0" cellpadding="0" cellspacing="0" class="full-width" style="margin: 0px auto; width: 560px; min-width: 280px; max-width: 90%;" role="presentation">
                          <!-- start space -->
                          <tr>
                            <td valign="top" height="1" style="height: 1px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
                          </tr><!-- end space -->
                          <!-- start title -->
                          <!-- end title -->
                          <!-- start content -->
                          <!-- end content -->
                        </table>
                      </td>
                    </tr><!-- end heading text -->
                    <!-- start 3-col -->
                    <!-- end 3-col -->
                    <!-- start 3-col -->
                    <!-- end 3-col -->
                    <!-- start space -->
                    <tr>
                      <td valign="top" height="15" style="height: 15px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
                    </tr><!-- end space -->
                    <tr>
                      <td valign="top">
                        <table width="560" align="center" border="0" cellpadding="0" cellspacing="0" class="full-width" style="margin: 0px auto; width: 560px; min-width: 280px; max-width: 90%;" role="presentation">
                          <!--start button-->
                          <tr>
                            <td valign="top">
                              <table width="auto" border="0" align="center" cellpadding="0" cellspacing="0" style="margin: 0px auto;mso-table-lspace:0pt; mso-table-rspace:0pt;" role="presentation">
                                <tr>
                                  <!-- start duplicate button -->
                                  <td class="full-block" valign="top" style="padding-top:10px; padding-bottom:10px; padding-left:5px; padding-right:5px;">
                                    <table width="auto" border="0" align="center" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 5px; border: 1px solid rgb(255, 144, 14); margin: 0px auto;mso-table-lspace:0pt; mso-table-rspace:0pt;" role="presentation" bgcolor="#ffffff">
                                      <tr>
                                        <td width="auto" align="center" valign="middle" height="40" style="font-size: 14px; color: #ff900e; font-weight: normal; font-family: 'Open Sans', Arial, Helvetica, sans-serif; word-break: break-word; background-clip: padding-box; padding-left: 24px; padding-right: 24px; line-height: 1;"><a data-mce-href="http://localhost:3000/public/index.html" href="http://localhost:3000/public/index.html" style="border-style: none; text-decoration: none !important; line-height: 24px; font-size: 14px; font-weight: 400; font-family: 'Open Sans', Arial, Helvetica, sans-serif;" border="0"><span style="color: #ff900e; font-style: normal; text-align: center; line-height: 24px; font-size: 14px; font-weight: 700; font-family: 'Open Sans', Arial, Helvetica, sans-serif;"><span style="font-style: normal; text-align: center; color: #ff900e; line-height: 24px; font-size: 14px; font-weight: 700; font-family: 'Open Sans', Arial, Helvetica, sans-serif;"> Ver más</span></span></a></td>
                                      </tr>
                                    </table>
                                  </td> <!-- end duplicate button -->
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <!--end button-->
                        </table>
                      </td>
                    </tr><!-- start space -->
                    <tr>
                      <td valign="top" height="33" style="height: 33px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
                    </tr><!-- end space -->
                  </table><!-- end container -->
                </td>
              </tr><!-- END LAYOUT-3 ( 3-COL ICON-IMAGE / TEXT ) -->
              <!-- START LAYOUT-10 ( UNSUBSCRIBE )-->
              <tr>
                <td valign="top" align="center" style="background-color: #1F3C88;" bgcolor="#1f3c88">
                  <!-- start container -->
                  <table width="600" align="center" border="0" cellspacing="0" cellpadding="0" style="background-color: #1f3c88; margin: 0px auto; width: 600px; min-width: 320px; max-width: 90%;" class="full-width" role="presentation" bgcolor="#1f3c88">
                    <tr>
                      <td valign="top" align="center">
                        <table width="560" align="center" border="0" cellpadding="0" cellspacing="0" class="full-width" style="table-layout: fixed; margin: 0px auto; width: 560px; min-width: 280px; max-width: 90%;" role="presentation">
                          <!-- start space -->
                          <tr>
                            <td valign="top" height="20" style="height: 20px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
                          </tr><!-- end space -->
                          <tr class="row" style="display: flex;">
                            <th valign="middle" class="full-block" style="display: table; margin: auto;">
                              <table width="244" align="left" border="0" cellspacing="0" cellpadding="0" class="full-width" role="presentation" style="min-width: 100%;">
                                <tr>
                                  <td align="center" style="font-size: 14px; color: #ffffff; font-weight: normal; font-family: 'Open Sans', Arial, Helvetica, sans-serif; word-break: break-word; line-height: 1;"><span style="color: #ffffff; text-decoration: none; word-break: break-word; font-style: normal; text-align: center; line-height: 24px; font-size: 14px; font-weight: 400; font-family: 'Open Sans', Arial, Helvetica, sans-serif;"><span style="color: #ffffff; word-break: break-word; font-style: normal; text-align: center; line-height: 24px; font-size: 14px; font-weight: 400; font-family: 'Open Sans', Arial, Helvetica, sans-serif;"> <a href="#" style="color: #ffffff; word-break: break-word; text-decoration: none !important; border-style: none; line-height: 24px; font-size: 14px; font-weight: 400; font-family: 'Open Sans', Arial, Helvetica, sans-serif;" data-mce-href="#" border="0"><span style="color: #ffffff; font-style: normal; text-align: center; line-height: 24px; font-size: 14px; font-weight: 400; font-family: 'Open Sans', Arial, Helvetica, sans-serif;"><span style="font-style: normal; text-align: center; color: #ffffff; line-height: 24px; font-size: 14px; font-weight: 400; font-family: 'Open Sans', Arial, Helvetica, sans-serif;">Sorbil © 2019.&nbsp;</span></span></a> </span></span></td>
                                </tr>
                              </table>
                            </th>
                            <th valign="middle" class="full-block" style="display: table; margin: auto; width: 40%;" width="40%">
                              <table width="20" border="0" cellpadding="0" cellspacing="0" align="left" class="full-width" style="height: 1px; border-spacing: 0px; min-width: 100%;" role="presentation">
                                <tr>
                                  <td height="1" class="h-20" style="border-collapse: collapse; height: 1px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
                                </tr>
                              </table>
                            </th>
                            <th valign="middle" class="full-block" style="display: table; margin: auto;">
                              <table width="87" align="right" border="0" cellspacing="0" cellpadding="0" class="full-width" role="presentation" style="min-width: 100%;">
                                <tr>
                                  <td align="center" style="font-size: 14px; color: #ffffff; font-weight: normal; font-family: 'Open Sans', Arial, Helvetica, sans-serif; word-break: break-word; line-height: 1;"> <span style="text-decoration: none; color: #ffffff; word-break: break-word; font-style: normal; text-align: center; line-height: 24px; font-size: 14px; font-weight: 700; font-family: 'Open Sans', Arial, Helvetica, sans-serif;"> <a href="#" style="color: #ffffff; word-break: break-word; text-decoration: none !important; border-style: none; line-height: 24px; font-size: 14px; font-weight: 700; font-family: 'Open Sans', Arial, Helvetica, sans-serif;" border="0"><span style="color: #ffffff; font-style: normal; text-align: center; line-height: 24px; font-size: 14px; font-weight: 700; font-family: 'Open Sans', Arial, Helvetica, sans-serif;"></span></a><a href="http://localhost:3000/public/views/fenix.html" data-mce-href="http://localhost:3000/public/views/fenix.html" style="border-style: none; text-decoration: none !important; line-height: 24px; font-size: 14px; font-weight: 700; font-family: 'Open Sans', Arial, Helvetica, sans-serif;" border="0"></a><a href="http://localhost:3000/public/views/fenix.html" data-mce-href="http://localhost:3000/public/views/fenix.html" style="border-style: none; text-decoration: none !important; line-height: 24px; font-size: 14px; font-weight: 700; font-family: 'Open Sans', Arial, Helvetica, sans-serif;" border="0"></a>Fénix</span> </td>
                                </tr>
                              </table>
                            </th>
                          </tr><!-- start space -->
                          <tr>
                            <td valign="top" height="20" style="height: 20px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
                          </tr><!-- end space -->
                        </table>
                      </td>
                    </tr>
                  </table><!-- end container -->
                </td>
              </tr><!-- END LAYOUT-10 ( UNSUBSCRIBE )-->
            </table></body>
            </html>`
					};
					transporter.sendMail(mailOptions, function (error, info) {
						if (error) {
							console.log(error);
						} else {
							console.logo('Correo enviado' + info.response);
						}
					})
				}
			} else {
				res.json({
					success: false,
					msg: 'El usuario no existe'
				});
			}
		}
	)
});

module.exports = router;