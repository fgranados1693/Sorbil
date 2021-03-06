'use strict';

const nodeMailer = require('nodemailer');
const express = require('express'),
    router = express.Router(),
    libreria = require('../models/libreria.model');

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

//Definicion de la ruta para registrar los libros

router.post('/registrar-libreria', function (req, res) {
    let body = req.body;

    let nueva_libreria = new libreria({
        //Info de la librería
        imagen: body.imagen,
        usuario: body.usuario,
        correo: body.correo,
        empresa: body.empresa,
        telefono: body.telefono,
        descripcion: body.descripcion,
        provincia: body.provincia,
        canton: body.canton,
        distrito: body.distrito,
        direccion_exacta: body.direccion_exacta,
        direccion_latitud: body.direccion_latitud,
        direccion_longitud: body.direccion_longitud,
        estado: 'pendiente'
    });


    nueva_libreria.save(
        function (err, libreriaDB) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    msj: 'La información no se pudo registrar',
                    err
                });
            } else {
                let mailOptions = {
                    from: 'fenixsorbil@gmail.com',
                    to: nueva_libreria.correo,
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
<title>Pendiente</title>

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
                            <td valign="top" height="25" style="height: 25px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
                          </tr><!-- end space -->
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td valign="top" align="center">
                        <table width="100%" align="center" border="0" cellspacing="0" cellpadding="0" style="margin: 0px auto; min-width: 100%;" role="presentation">
                          <tr>
                            <td align="center" style="font-size: 28px; color: #333333; font-weight: normal; font-family: 'Open Sans', Arial, Helvetica, sans-serif; word-break: break-word; line-height: 1;"><span style="color: #333333; font-style: normal; text-align: center; line-height: 34px; font-size: 28px; font-weight: 400; font-family: 'Open Sans', Arial, Helvetica, sans-serif;">¡Gracias por tu solicitud !<br><span style="color: #ff900e; font-style: normal; text-align: center; line-height: 34px; font-size: 28px; font-weight: 700; font-family: 'Open Sans', Arial, Helvetica, sans-serif;"><br></span></span></td>
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
                            <td align="center" style="font-size: 28px; color: #333333; font-weight: normal; font-family: 'Open Sans', Arial, Helvetica, sans-serif; word-break: break-word; line-height: 1;"><span style="color: #333333; font-style: normal; text-align: center; line-height: 34px; font-size: 28px; font-weight: 400; font-family: 'Open Sans', Arial, Helvetica, sans-serif;"><span style="color: #333333; font-style: normal; text-align: center; line-height: 24px; font-size: 15px; font-weight: 400; font-family: 'Open Sans', Arial, Helvetica, sans-serif;"><span style="font-style: normal; text-align: center; color: #333333; line-height: 24px; font-size: 15px; font-weight: 400; font-family: 'Open Sans', Arial, Helvetica, sans-serif;">Tu solicitud está siendo revisada en este momento por uno de nuestros agentes</span></span><br><span style="color: #ff900e; font-style: normal; text-align: center; line-height: 34px; font-size: 28px; font-weight: 700; font-family: 'Open Sans', Arial, Helvetica, sans-serif;"><br></span></span></td>
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
                res.json({
                    success: true,
                    msj: 'La información se registró con éxito'
                });
            }
        }
    );
});

router.get('/listar-librerias', function (req, res) {
    libreria.find(function (err, libreriaDB) {
        if (err) {
            return res.status(400).json({
                success: false,
                msj: 'No se pueden listar las librerías',
                err
            });
        } else {
            return res.json({
                success: true,
                lista_librerias: libreriaDB
            });
        }
    })
});

router.get('/buscar-libreria-id/:_id', function (req, res) {
    // console.log("aqui");
    // console.log(req.body);
    libreria.findById(req.body._id, function (err, libreriaDB) {
        if (err) {
            return res.status(400).json({
                success: false,
                msj: 'No se encontro ninguna librería con ese _id.',
                err
            });
        } else {
            return res.json({
                success: true,
                libreria: libreriaDB
            });
        }
    })
});



router.post('/agregar-sucursal', function (req, res) {
    libreria.update({ correo: req.body.correo }, {
        $push: {
            'sucursales': {
                nombre: req.body.nombre,
                telefono: req.body.telefono,
                provincia: req.body.provincia,
                canton: req.body.canton,
                distrito: req.body.distrito,
                direccion_latitud: req.body.direccion_latitud,
                direccion_longitud: req.body.direccion_longitud
            }
        }
    },
        function (error) {
            if (error) {
                return res.status(400).json({
                    success: false,
                    msj: 'No se pudo agregar la sucursal',
                    error
                });
            } else {
                res.json({
                    success: true,
                    msj: 'La sucursal se agregó con éxito'
                });
            }
        }
    )
});

router.post('/agregar-libros-sucursal', function (req, res) {
    libreria.update({ correo: req.body.correo }, {
        $push: {
            'libros': {
                idlibro: req.body.idlibro,
                cantidad: req.body.cantidad
            }
        }
    },
        function (error) {
            if (error) {
                return res.status(400).json({
                    success: false,
                    msj: 'No se pudo agregar los libros a la librería.',
                    error
                });
            } else {
                res.json({
                    success: true,
                    msj: 'Los libros se agregaron con exito a la librería.'
                });
            }
        }
    )
});


router.get('/buscar-libros-libreria/:correo', function (req, res) {
    libreria.find({ correo: req.body.correo }, function (err, librobd) {
        if (err) {
            return res.json({
                success: false,
                msj: 'No se encontro ningun libro.',
                err
            });
        } else {
            
            return res.json({
                success: true,
                libreria: librobd
            });
        }
    })
});

router.post('/actualizar-libros-libreria', function (req, res) {

    libreria.findOneAndUpdate({ correo: req.body.correo }, {
        $set: {
            'libros': req.body.libros
        }

    },
        function (error) {
            if (error) {
                return res.json({
                    success: false,
                    msj: 'No se pudo agregar la sucursal',
                    error
                });
            } else {
                res.json({
                    success: true,
                    msj: 'La sucursal se agregó con éxito'
                });
            }
        }
    )

});

router.get('/listar-sucursales/:correo', function (req, res) {
    libreria.find({ correo: req.body.correo }, function (err, libreriaDB) {

        if (err) {
            return res.status(400).json({
                success: false,
                msj: 'No se encontró ninguna sucursal con ese id.',
                err
            });
        } else {
            return res.json({
                success: true,
                libreria: libreriaDB
            });
        }
    })
});


// modificar estado de la sucursal
router.post('/modificar-estado-sucursal', function (req, res) {
    let body = req.body;

    libreria.findOneAndUpdate({ correo: req.body.correo }, {
        $set: {
            'sucursales': body.datos
        }
    },
        function (error) {
            if (error) {
                res.json({ success: false, msg: 'No se pudo modificar la sucursal' });
            } else {
                res.json({ success: true, msg: 'La sucursal se modificó con éxito' });
            }
        }
    )
});

// eliminar sucursal
// correo : correo de la libreria
// idSucursal: id de la sucursal dentro del array de ofertas

router.post('/eliminar-sucursal', function (req, res) {
    let body = req.body;

    libreria.findOneAndUpdate({ correo: req.body.correo }, {
        $pull: {
            sucursales: {
                _id: req.body.idSucursal
            }
        }
    },
        function (error) {
            if (error) {
                res.json({ success: false, msg: 'No se pudo modificar la sucursal' });
            } else {
                res.json({ success: true, msg: 'La sucursal se modificó con éxito' });
            }
        }
    )
});

// MODIFICAR SUCURSAL

router.post('/modificar-sucursal', function (req, res) {
    let body = req.body;


    libreria.findOneAndUpdate({ correo: req.body.correo }, {

        $set: body.datos
            
        },
        function(error){
            if (error) {
                return res.json({
                    success: false,
                    msj: 'No se pudo modificar la sucursal',
                    error
                });
            } else {
                res.json({
                    success: true,
                    msj: 'La sucursal se modificó con éxito'
                });
                
            }
        }
    )
});

router.get('/buscar-libreria-por-correo/:correo', function (req, res) {
    libreria.find({ correo: req.body.correo }, function (err, libreriaDB) {
        if (err) {
            return res.status(400).json({
                success: false,
                msj: 'No se encontró ningún libreria con ese correo',
                err
            });
        } else {
            return res.json({
                success: true,
                libreria: libreriaDB
            });
        }
    })
});

router.post('/modificar-libreria', function (req, res) {
    let body = req.body;

    libreria.findOneAndUpdate({ correo: req.body.correo }, {
        $set: req.body
    },
        function (error) {
            if (error) {
                return res.json({
                    success: false,
                    msj: 'No se pudo modificar la sucursal',
                    error
                });
            } else {
                res.json({
                    success: true,
                    msj: 'La sucursal se modificó con éxito'
                });
            }
        }
    )
});

router.post('/eliminar-libreria', function (req, res) {
    let body = req.body;

    libreria.findByIdAndRemove(body._id,
        function (error) {
            if (error) {
                res.json({ success: false, msg: 'No se pudo eliminar la librería' });
            } else {
                res.json({ success: true, msg: 'La librería se eliminó con éxito' });
            }
        }
    )
});


router.post('/deshabilitar-libreria', function (req, res) {
    let body = req.body;

    libreria.findByIdAndUpdate(body._id, {
        $set: {
            estado: 'deshabilitado'
        }
    },
        function (error) {
            if (error) {
                res.json({ success: false, msg: 'No se pudo deshabilitar la librería' });
            } else {
                res.json({ success: true, msg: 'La librería se deshabilitó con éxito' });
            }
        }
    )
});

router.post('/habilitar-libreria', function (req, res) {
    let body = req.body;

    libreria.findByIdAndUpdate(body._id, {
        $set: {
            estado: 'habilitado'
        }
    },
        function (error) {
            if (error) {
                res.json({ success: false, msg: 'No se pudo habilitar la librería' });
            } else {
                res.json({ success: true, msg: 'La librería se habilitó con éxito' });
            }
        }
    )
});

// router.post('/modificar-libreria_correo', function(req, res){
//     libreria.findOneAndUpdate({ correo: req.body.correo }, {
//         $set: req.body.libreriaDatos
//     })

// });

// router.post('/eliminar-libreria_correo', function(req, res){
//     Libreria.findByIdAndRemove({ correo: req.body.correo }, {
//         $set: req.body.libreriaDatos
//     })
// });

// router.post('/habilitar-libreria_correo', function(req, res){
//     Libreria.findOneAndUpdate({ correo: req.body.correo }, {
//         $set: {
//             estado: 'habilitado'
//         }
//     })
// });

router.post('/agregar-libros-sucursal_correo', function(req, res) {
    libreria.update({ correo: req.body.correo }, {
            $push:{ 
                librosSuc: {
                    idlibro: req.body.idlibro,
                    idSuc: req.body.idSuc,
                    cantidad: req.body.cantidad
                    
                }
            }
        },
        function(error){
            if (error) {
                return res.status(400).json({
                    success: false,
                    msj: 'No se pudo agregar el libro a la sucursal',
                    error
                });
            } else{
                res.json({
                    success: true,
                    msj: 'El libro se guardó con éxito en la sucursal'
                });
            }
        }
    )
});

router.post('/eliminar-libreria', function(req, res) {
    let body = req.body;

    libreria.findByIdAndRemove(body._id,
        function(error) {
            if (error) {
                res.json({ success: false, msg: 'No se pudo eliminiar la libreria' });
            } else {
                res.json({ success: true, msg: 'La librería se eliminó con éxito' });
            }
        }
    )
});

module.exports = router;