'use strict';

const nodeMailer = require('nodemailer');
const express = require('express'),
    router = express.Router(),
    venta = require('../models/ventas.model');


const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'fenixsorbil@gmail.com',
        pass: 'Fenix0627201'
    }
});

//Definición de la ruta para registrar contactos
router.post('/registrar-venta', function(req, res) {
    let body = req.body;

    let nuevo_venta = new venta({
        idlibreria: body.idlibreria,
        idSuc: body.idSuc,
        idUser: body.idUser,
        idLibro: body.idLibro
    });

    nuevo_venta.save(
        function(err, ventaDB) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    msj: 'La venta no se pudo registrar',
                    err
                });
            } else {
                res.json({
                    success: true,
                    msj: 'La venta se registró con éxito'
                });
            }
        }
    );
});

router.post('/enviar-factura', function (req, res) {
  
  let mailOptions = {
      from: 'fenixsorbil@gmail.com',
      to: req.body.correo,
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
<title>Factura</title>

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
<!--START LAYOUT-4 ( 3-COL IMAGE / TEXT / BUTTON )-->
<tr>
<td align="center" valign="top" style="background-color: #ECEFF1;" bgcolor="#eceff1">
<!-- start container -->
<table width="600" align="center" border="0" cellspacing="0" cellpadding="0" class="full-width" style="background-color: #eceff1; margin: 0px auto; width: 600px; min-width: 320px; max-width: 90%;" role="presentation" bgcolor="#eceff1">
<tr>
<td valign="top">
<table width="560" align="center" border="0" cellspacing="0" cellpadding="0" style="margin: 0px auto; width: 560px; min-width: 280px; max-width: 90%;" class="full-width" role="presentation">
<!-- start space -->
<tr>
  <td valign="top" height="16" style="height: 16px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
</tr><!-- end space -->
<!-- start content -->
<tr>
  <td valign="top" align="center">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" style="margin: 0px auto; min-width: 100%;" role="presentation">
      <!-- start title -->
      <!-- end title -->
      <!-- start content -->
      <!-- end content -->
      <!-- start space -->
      <tr>
        <td valign="top" height="1" style="height: 1px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
      </tr><!-- end space -->
    </table>
  </td>
</tr><!-- end content -->
<!-- start content container-->
<tr>
  <td valign="top">
    <table width="100%" align="center" border="0" cellpadding="0" cellspacing="0" style="margin: 0px auto; min-width: 100%;" role="presentation">
      <tr class="row" style="display: flex;">
        <th valign="top" class="full-block" style="display: table; margin: 0px auto;">
          <table width="170" align="left" border="0" cellpadding="0" cellspacing="0" class="full-width left" style="max-width: 170px; min-width: 100%;" role="presentation">
            <tr>
              <td valign="top">
                <table width="100%" align="center" border="0" cellpadding="0" cellspacing="0" style="margin: 0px auto; min-width: 100%;" role="presentation">
                  <!-- start title -->
                  <!-- end title -->
                  <tr>
                    <td valign="top" style="padding-left:5px; padding-right:5px;">
                      <table width="100%" align="center" border="0" cellpadding="0" cellspacing="0" style="margin: 0px auto; min-width: 100%;" role="presentation">
                        <tr>
                          <td align="center" style="font-size: 14px; color: #888888; font-weight: 300; font-family: 'Open Sans', Arial, Helvetica, sans-serif; word-break: break-word; line-height: 24px;"><br></td>
                        </tr>
                      </table>
                    </td>
                  </tr>
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
          <table width="170" align="left" border="0" cellpadding="0" cellspacing="0" class="full-width left" style="max-width: 170px; min-width: 100%;" role="presentation">
            <tr>
              <td valign="top">
                <table width="100%" align="center" border="0" cellpadding="0" cellspacing="0" style="margin: 0px auto; min-width: 100%;" role="presentation">
                  <tr>
                    <td valign="top">
                      <table width="100%" align="center" border="0" cellpadding="0" cellspacing="0" style="margin: 0px auto; min-width: 100%;" role="presentation">
                        <tr>
                          <td align="center" valign="top" class="image-full-width" width="170" style="width: 170px; line-height: 0px;"> <a href="#" style="text-decoration: none !important; font-size: inherit; border-style: none;" border="0"> <img src="https://res.cloudinary.com/fenixsorbil/image/upload/v1564173689/Assets/logo_u1mpzc.png" width="170" style="max-width: 170px; width: 170px; height: auto; display: block !important; min-width: 100%;" alt="set6-image2" height="auto"></a> </td>
                        </tr><!-- start space -->
                        <tr>
                          <td valign="top" height="12" style="height: 12px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
                        </tr><!-- end space -->
                      </table>
                    </td>
                  </tr><!-- start title -->
                  <!-- end title -->
                  <tr>
                    <td valign="top" style="padding-left:5px; padding-right:5px;">
                      <table width="100%" align="center" border="0" cellpadding="0" cellspacing="0" style="margin: 0px auto; min-width: 100%;" role="presentation"></table>
                    </td>
                  </tr>
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
          <table width="170" align="right" border="0" cellpadding="0" cellspacing="0" class="full-width right" style="max-width: 170px; min-width: 100%;" role="presentation">
            <tr>
              <td valign="top">
                <table width="100%" align="center" border="0" cellpadding="0" cellspacing="0" style="margin: 0px auto; min-width: 100%;" role="presentation">
                  <!-- start title -->
                  <!-- end title -->
                  <tr>
                    <td valign="top" style="padding-left:5px; padding-right:5px;">
                      <table width="100%" align="center" border="0" cellpadding="0" cellspacing="0" style="margin: 0px auto; min-width: 100%;" role="presentation">
                        <tr>
                          <td align="center" style="font-size: 14px; color: #888888; font-weight: 300; font-family: 'Open Sans', Arial, Helvetica, sans-serif; word-break: break-word; line-height: 24px;"><br></td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </th>
      </tr><!-- start space -->
      <tr>
        <td valign="top" height="8" style="height: 8px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
      </tr><!-- end space -->
    </table>
  </td>
</tr><!-- end content container-->
<!--start button-->
<tr>
  <td valign="top" align="center">
    <table width="auto" align="center" border="0" cellspacing="0" cellpadding="0" style="margin: 0px auto;mso-table-lspace:0pt; mso-table-rspace:0pt;" role="presentation">
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
  <td valign="top" height="1" style="height: 1px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
</tr><!-- end space -->
</table>
</td>
</tr>
</table><!-- end container -->
</td>
</tr>
<!--END LAYOUT-4 ( 3-COL IMAGE / TEXT / BUTTON )-->
<!-- START LAYOUT-1 ( MENU BAR ) -->
<tr>
<td valign="top" align="center" style="background-color: #eceff1; " bgcolor="#eceff1">
<table width="600" align="center" border="0" cellspacing="0" cellpadding="0" class="full-width" style="background-color: #eceff1; margin: 0px auto; width: 600px; min-width: 320px; max-width: 90%;" role="presentation" bgcolor="#eceff1">
<!-- start space -->
<tr>
<td valign="top" height="1" style="height: 1px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
</tr><!-- end space -->
<tr>
<td valign="top" align="center">
<table width="560" align="center" border="0" cellspacing="0" cellpadding="0" class="full-width" style="margin: 0px auto; width: 560px; min-width: 280px; max-width: 90%;" role="presentation">
<!-- start title -->
<tr>
  <td valign="top">
    <table width="100%" align="center" border="0" cellpadding="0" cellspacing="0" style="background-color: #1f3c88; border-top-left-radius: 3px; border-top-right-radius: 3px; margin: 0px auto; min-width: 100%;" role="presentation" bgcolor="#1f3c88">
      <!-- start space -->
      <tr>
        <td valign="top" height="30" style="height: 30px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
      </tr><!-- end space -->
      <tr>
        <td align="center" style="font-size: 24px; color: #ffffff; font-weight: bold; font-family: 'Open Sans', Arial, Helvetica, sans-serif; word-break: break-word; line-height: 1;"><span style="color: #ffffff; font-style: normal; text-align: center; line-height: 30px; font-size: 24px; font-weight: 700; font-family: 'Open Sans', Arial, Helvetica, sans-serif;"><span style="font-style: normal; text-align: center; color: #ffffff; line-height: 30px; font-size: 24px; font-weight: 700; font-family: 'Open Sans', Arial, Helvetica, sans-serif;"><b style="font-size: 24px; font-weight: 700; font-family: 'Open Sans', Arial, Helvetica, sans-serif;">Factura de compra</b></span></span></td>
      </tr><!-- start space -->
      <tr>
        <td valign="top" height="30" style="height: 30px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
      </tr><!-- end space -->
    </table>
  </td>
</tr><!-- end title -->
</table>
</td>
</tr>
</table>
</td>
</tr><!-- END LAYOUT-1 ( MENU BAR ) -->
<!-- START LAYOUT-3 ( PRICE LIST ) -->
<tr>
<td valign="top" align="center" style="background-color: #eceff1; " bgcolor="#eceff1">
<table width="600" align="center" border="0" cellspacing="0" cellpadding="0" class="full-width" style="background-color: #eceff1; margin: 0px auto; width: 600px; min-width: 320px; max-width: 90%;" role="presentation" bgcolor="#eceff1">
<tr>
<td valign="top" align="center">
<table width="560" align="center" border="0" cellspacing="0" cellpadding="0" class="full-width" style="margin: 0px auto; width: 560px; min-width: 280px; max-width: 90%;" role="presentation">
<!-- start heading -->
<tr>
  <td valign="top">
    <table width="100%" align="center" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; margin: 0px auto; min-width: 100%;" role="presentation" bgcolor="#ffffff">
      <tr>
        <td valign="top" style="padding-left: 20px; padding-right: 20px;">
          <table width="100%" align="center" border="0" cellspacing="0" cellpadding="0" style="margin: 0px auto; min-width: 100%;" role="presentation">
            <!-- start space -->
            <tr>
              <td valign="top" height="30" style="height: 30px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
            </tr><!-- end space -->
            <tr>
              <td valign="top" height="25" width="100" style="font-size: 18px; color: #333333; font-weight: normal; font-family: 'Open Sans', Arial, Helvetica, sans-serif; word-break: break-word; line-height: 1;" align="left"><span style="color: #333333; text-decoration: none; font-style: normal; text-align: left; line-height: 24px; font-size: 18px; font-weight: 700; font-family: 'Open Sans', Arial, Helvetica, sans-serif;"><span style="font-style: normal; text-align: left; color: #333333; line-height: 24px; font-size: 18px; font-weight: 700; font-family: 'Open Sans', Arial, Helvetica, sans-serif;">Datos de compra</span></span></td>
            </tr><!-- start space -->
            <tr>
              <td valign="top" height="20" style="height: 20px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
            </tr><!-- end space -->
          </table>
        </td>
      </tr>
    </table>
  </td>
</tr><!-- end heading -->
<!-- start table list -->
<tr>
  <td valign="top">
    <table width="100%" align="center" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; margin: 0px auto; min-width: 100%;" role="presentation" bgcolor="#ffffff">
      <tr>
        <td valign="top" style="padding-left: 20px; padding-right: 20px;">
          <table width="100%" align="center" border="0" cellspacing="0" cellpadding="0" style="border-bottom: 1px solid rgb(232, 232, 232); margin: 0px auto; min-width: 100%;" role="presentation">
            <!-- start space -->
            <tr>
              <td valign="top" height="20" style="height: 20px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
            </tr><!-- end space -->
            <tr>
              <td valign="top" height="25" width="100" style="font-size: 14px; color: #888888; font-weight: normal; font-family: 'Open Sans', Arial, Helvetica, sans-serif; word-break: break-word; line-height: 1;" align="left"><span style="color: #888888; font-style: normal; text-align: left; line-height: 24px; font-size: 14px; font-weight: 400; font-family: 'Open Sans', Arial, Helvetica, sans-serif;"><span style="font-style: normal; text-align: left; color: #888888; line-height: 24px; font-size: 14px; font-weight: 400; font-family: 'Open Sans', Arial, Helvetica, sans-serif;">Nombre</span></span></td>
              <td valign="top">
                <table width="100%" align="center" border="0" cellspacing="0" cellpadding="0" style="height: 100%; margin: 0px auto; min-width: 100%;" role="presentation">
                  <tr>
                    <td valign="top" style="font-size: 14px; color: #333333; font-weight: normal; font-family: 'Open Sans', Arial, Helvetica, sans-serif; word-break: break-word; line-height: 1;" align="right"><span style="font-style: normal; text-align: right; color: #333333; line-height: 24px; font-size: 14px; font-weight: 400; font-family: 'Open Sans', Arial, Helvetica, sans-serif;">${req.body.nombre}<br></span></td>
                  </tr>
                </table>
              </td>
            </tr><!-- start space -->
            <tr>
              <td valign="top" height="20" style="height: 20px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
            </tr><!-- end space -->
          </table>
        </td>
      </tr>
    </table>
  </td>
</tr><!-- end table list -->
<!-- start table list -->
<tr>
  <td valign="top">
    <table width="100%" align="center" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; margin: 0px auto; min-width: 100%;" role="presentation" bgcolor="#ffffff">
      <tr>
        <td valign="top" style="padding-left: 20px; padding-right: 20px;">
          <table width="100%" align="center" border="0" cellspacing="0" cellpadding="0" style="border-bottom: 1px solid rgb(232, 232, 232); margin: 0px auto; min-width: 100%;" role="presentation">
            <!-- start space -->
            <tr>
              <td valign="top" height="20" style="height: 20px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
            </tr><!-- end space -->
            <tr>
              <td valign="top" height="25" width="100" style="font-size: 14px; color: #888888; font-weight: normal; font-family: 'Open Sans', Arial, Helvetica, sans-serif; word-break: break-word; line-height: 1;" align="left"><span style="color: #888888; font-style: normal; text-align: left; line-height: 24px; font-size: 14px; font-weight: 400; font-family: 'Open Sans', Arial, Helvetica, sans-serif;"><span style="font-style: normal; text-align: left; color: #888888; line-height: 24px; font-size: 14px; font-weight: 400; font-family: 'Open Sans', Arial, Helvetica, sans-serif;">Apellido</span></span></td>
              <td valign="top">
                <table width="100%" align="center" border="0" cellspacing="0" cellpadding="0" style="height: 100%; margin: 0px auto; min-width: 100%;" role="presentation">
                  <tr>
                    <td valign="top" style="font-size: 14px; color: #333333; font-weight: normal; font-family: 'Open Sans', Arial, Helvetica, sans-serif; word-break: break-word; line-height: 1;" align="right"><span style="font-style: normal; text-align: right; color: #333333; line-height: 24px; font-size: 14px; font-weight: 400; font-family: 'Open Sans', Arial, Helvetica, sans-serif;">${req.body.apellido}<br></span></td>
                  </tr>
                </table>
              </td>
            </tr><!-- start space -->
            <tr>
              <td valign="top" height="20" style="height: 20px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
            </tr><!-- end space -->
          </table>
        </td>
      </tr>
    </table>
  </td>
</tr><!-- end table list -->
<!-- start table list -->
<!-- end table list -->
<!-- start table list -->
<!-- end table list -->
<!-- start table list -->
<tr>
  <td valign="top">
    <table width="100%" align="center" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-bottom: 2px solid rgb(232, 232, 232); margin: 0px auto; min-width: 100%;" role="presentation" bgcolor="#ffffff">
      <tr>
        <td valign="top" style="padding-left: 20px; padding-right: 20px;">
          <table width="100%" align="center" border="0" cellspacing="0" cellpadding="0" style="margin: 0px auto; min-width: 100%;" role="presentation">
            <!-- start space -->
            <tr>
              <td valign="top" height="20" style="height: 20px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
            </tr><!-- end space -->
            <tr>
              <td valign="top" height="25" width="100" style="font-size: 18px; color: #333333; font-weight: bold; font-family: 'Open Sans', Arial, Helvetica, sans-serif; word-break: break-word; line-height: 1;" align="left"><span style="font-style: normal; text-align: left; color: #333333; line-height: 24px; font-size: 18px; font-weight: 700; font-family: 'Open Sans', Arial, Helvetica, sans-serif;"> Total </span></td>
              <td valign="top">
                <table width="100%" align="center" border="0" cellspacing="0" cellpadding="0" style="height: 100%; margin: 0px auto; min-width: 100%;" role="presentation">
                  <tr>
                    <td valign="top" style="font-size: 14px; color: #009f64; font-weight: bold; font-family: 'Open Sans', Arial, Helvetica, sans-serif; word-break: break-word; line-height: 1;" align="right"><span style="color: #009f64; font-style: normal; text-align: right; line-height: 24px; font-size: 16px; font-weight: 700; font-family: 'Open Sans', Arial, Helvetica, sans-serif;"><span style="font-style: normal; text-align: right; color: #009f64; line-height: 24px; font-size: 16px; font-weight: 700; font-family: 'Open Sans', Arial, Helvetica, sans-serif;"> ₡${req.body.suma} </span></span></td>
                  </tr>
                </table>
              </td>
            </tr><!-- start space -->
            <tr>
              <td valign="top" height="20" style="height: 20px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
            </tr><!-- end space -->
          </table>
        </td>
      </tr>
    </table>
  </td>
</tr>
</table>
</td>
</tr>
</table>
</td>
</tr><!-- END LAYOUT-3 ( PRICE LIST ) -->
<!-- START LAYOUT-6 ( 3-COL IMAGE-ICON / TEXT / BUTTON ) -->
<tr>
<td valign="top" align="center" style="background-color: #ECEFF1;" bgcolor="#eceff1">
<!-- start container -->
<table width="600" align="center" border="0" cellspacing="0" cellpadding="0" class="full-width" style="background-color: #eceff1; margin: 0px auto; width: 600px; min-width: 320px; max-width: 90%;" role="presentation" bgcolor="#eceff1">
<tr>
<td valign="top" align="center">
<table width="560" align="center" border="0" cellpadding="0" cellspacing="0" class="full-width" style="margin: 0px auto; width: 560px; min-width: 280px; max-width: 90%;" role="presentation">
<!-- start space -->
<tr>
  <td valign="top" height="1" style="height: 1px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
</tr><!-- end space -->
<!-- start 3-col -->
<!-- end 3-col -->
<!-- start content -->
<tr>
  <td valign="top" align="center">
    <table width="100%" align="center" border="0" cellpadding="0" cellspacing="0" style="margin: 0px auto; min-width: 100%;" role="presentation">
      <tr>
        <td align="center" style="font-size: 14px; color: #888888; font-weight: normal; font-family: 'Open Sans', Arial, Helvetica, sans-serif; word-break: break-word; line-height: 24px;"><br></td>
      </tr><!-- start space -->
      <tr>
        <td valign="top" height="6" style="height: 6px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
      </tr><!-- end space -->
      <tr>
        <td valign="top" align="center">
          <table width="auto" align="center" border="0" cellspacing="0" cellpadding="0" style="margin: 0px auto;mso-table-lspace:0pt; mso-table-rspace:0pt;" role="presentation">
            <tr> </tr>
          </table>
        </td>
      </tr><!-- start space -->
      <tr>
        <td valign="top" height="13" style="height: 13px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
      </tr><!-- end space -->
    </table>
  </td>
</tr><!-- end content -->
<!-- start space -->
<tr>
  <td valign="top" height="2" style="height: 2px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
</tr><!-- end space -->
</table>
</td>
</tr>
</table><!-- end container -->
</td>
</tr><!-- END LAYOUT-6 ( 3-COL IMAGE-ICON / TEXT / BUTTON ) -->
<!-- START LAYOUT-16 ( UNSUBSCRIBE )-->
<tr>
<td valign="top" align="center" style="background-color: #1F3C88;" bgcolor="#1f3c88">
<!-- start container -->
<table width="600" align="center" border="0" cellspacing="0" cellpadding="0" style="background-color: #1f3c88; margin: 0px auto; width: 600px; min-width: 320px; max-width: 90%;" class="full-width" role="presentation" bgcolor="#1f3c88">
<tr>
<td valign="top" align="center">
<table width="560" border="0" cellspacing="0" cellpadding="0" align="center" class="full-width" style="margin: 0px auto; width: 560px; min-width: 280px; max-width: 90%;" role="presentation">
<!-- start space -->
<tr>
  <td valign="top" height="20" style="height: 20px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
</tr><!-- end space -->
<tr>
  <td valign="top" align="center">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" style="margin: 0px auto; min-width: 100%;" role="presentation">
      <tr>
        <td valign="middle" align="center">
          <!-- start unsubscribe -->
          <table width="auto" align="center" border="0" cellspacing="0" cellpadding="0" style="margin: 0px auto;mso-table-lspace:0pt; mso-table-rspace:0pt;" role="presentation">
            <tr>
              <td align="center" style="font-size: 14px; color: #ffffff; font-weight: normal; font-family: 'Open Sans', Arial, Helvetica, sans-serif; word-break: break-word; line-height: 1;"><span style="color: #ffffff; text-decoration: none; font-style: normal; text-align: center; line-height: 24px; font-size: 14px; font-weight: 400; font-family: 'Open Sans', Arial, Helvetica, sans-serif;"><span style="font-style: normal; text-align: center; color: #ffffff; line-height: 24px; font-size: 14px; font-weight: 400; font-family: 'Open Sans', Arial, Helvetica, sans-serif;"> ©&nbsp;2019&nbsp;Sorbil&nbsp;<a href="#" style="color: #ffffff; text-decoration: none !important; border-style: none; line-height: 24px; font-size: 14px; font-weight: 400; font-family: 'Open Sans', Arial, Helvetica, sans-serif;" data-mce-href="#" border="0">|&nbsp;T</a>odos los derechos reservados.</span></span></td>
            </tr>
          </table><!-- end unsubscribe -->
        </td>
      </tr>
    </table>
  </td>
</tr><!-- start space -->
<tr>
  <td valign="top" height="20" style="height: 20px; font-size: 0px; line-height: 0;" aria-hidden="true">&nbsp;</td>
</tr><!-- end space -->
</table>
</td>
</tr>
</table><!-- end container -->
</td>
</tr><!-- END LAYOUT-16 ( UNSUBSCRIBE )-->
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
      msj: 'La venta se envió con éxito'
  });
});

router.get('/listar-ventas', async function (req, res) {
  venta.find(function (err, ventasDB) {
      if (err) {
          return res.status(400).json({
              success: false,
              msj: 'No se pueden listar los contactos',
              err
          });
      } else {
          return res.json({
              success: true,
              lista_ventas: ventasDB
          });
      }
  })
});


module.exports = router;