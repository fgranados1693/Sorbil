'use strict';

const nodeMailer = require('nodemailer');
const express = require('express'),
    router = express.Router(),
    Club = require('../models/club.model');

router.param('_id', function (req, res, next, _id) {
    req.body._id = _id;
    next();
});

//Definicion de credenciales para enviar correos

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'fenixsorbil@gmail.com',
        pass: 'Fenix0627201'
    }
});

//Definicion de la ruta para registrar los libros

router.post('/registrar-club', function (req, res) {
    let body = req.body;

    let nuevo_club = new Club({
        imagen: body.imagen,
        tipo: body.tipo,
        nombre: body.nombre,
        tema: body.tema,
        correo: body.correo,
        telefono: body.telefono,
        categoria: body.categoria,
        genero: body.genero,
        fecha: body.fecha,
        hora: body.hora,
        frecuencia: body.frecuencia,
        descripcion: body.descripcion,
        //Solamente para el club presencial
        provincia: body.provincia,
        canton: body.canton,
        distrito: body.distrito,
        direccion_exacta: body.direccion_exacta,
        estado: 'habilitado'
    });


    nuevo_club.save(
        function (err, clubDB) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    msj: 'El club de lectura no se pudo registrar',
                    err
                });
            } else {
                let mailOptions = {
                    from: 'fenixsorbil@gmail.com',
                    to: nuevo_club.correo,
                    subject: 'Bienvenido a Sorbil',
                    html: `
                    <!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="format-detection" content="date=no">
    <meta name="format-detection" content="telephone=no" />
    <meta name="x-apple-disable-message-reformatting">
    <title>Sorbil</title>

    <!--[if mso]>

	<style>

	* {font-family: Arial, Helvetica, sans-serif !important;}

	</style>

	<![endif]-->

    <!--[if !mso]><!-->

    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700,300&subset=latin,cyrillic,greek"
        rel="stylesheet" type="text/css">

    <!--<![endif]-->

    <style type="text/css">
        .ReadMsgBody {
            width: 100%;
            background-color: #ffffff;
        }

        .ExternalClass {
            width: 100%;
            background-color: #ffffff;
        }

        .ExternalClass,
        .ExternalClass p,
        .ExternalClass span,
        .ExternalClass font,
        .ExternalClass td,
        .ExternalClass tbody {
            line-height: 100%;
        }

        #outlook a {
            padding: 0;
        }

        html,
        body {
            margin: 0 auto !important;
            padding: 0 !important;
            height: 100% !important;
            width: 100% !important;
        }

        * {
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%;
        }

        table,
        td {
            mso-table-lspace: 0pt !important;
            mso-table-rspace: 0pt !important;
        }

        table {
            border-spacing: 0 !important;
        }

        table table table {
            table-layout: auto;
        }

        a,
        span a {
            text-decoration: none !important;
        }

        .yshortcuts,
        .yshortcuts a,
        .yshortcuts a:link,
        .yshortcuts a:visited,
        .yshortcuts a:hover,
        .yshortcuts a span {
            text-decoration: none !important;
            border-bottom: none !important;
        }

        /*mailChimp class*/
        ul {
            padding-left: 10px;
            margin: 0;
        }

        .default-edit-image {
            height: 20px;
        }

        .tpl-repeatblock {
            padding: 0px !important;
            border: 1px dotted rgba(0, 0, 0, 0.2);
        }

        .tpl-content {
            padding: 0px !important;
        }

        /* Start Old CSS */
        @media only screen and (max-width: 640px) {
            .container {
                width: 95% !important;
                max-width: 95% !important;
                min-width: 95% !important;
                padding-left: 15px !important;
                padding-right: 15px !important;
                text-align: center !important;
                clear: both;
            }

            .full-width {
                width: 100% !important;
                max-width: 100% !important;
                min-width: 100% !important;
                clear: both;
            }

            .full-width-center {
                width: 100% !important;
                max-width: 100% !important;
                text-align: center !important;
                clear: both;
                margin: 0 auto;
                float: none;
            }

            .force-240-center {
                width: 240px !important;
                clear: both;
                margin: 0 auto;
                float: none;
            }

            .auto-center {
                width: auto !important;
                max-width: 100% !important;
                text-align: center !important;
                clear: both;
                margin: 0 auto;
                float: none;
            }

            .auto-center-all {
                width: auto !important;
                max-width: 75% !important;
                text-align: center !important;
                clear: both;
                margin: 0 auto;
                float: none;
            }

            .auto-center-all * {
                width: auto !important;
                max-width: 100% !important;
                text-align: center !important;
                clear: both;
                margin: 0 auto;
                float: none;
            }

            .col-3,
            .col-3-not-full {
                width: 30.35% !important;
                max-width: 100% !important;
            }

            .col-2 {
                width: 47.3% !important;
                max-width: 100% !important;
            }

            .full-block {
                display: block !important;
                clear: both;
            }

            /* image */
            .image-full-width img {
                width: 100% !important;
                height: auto !important;
                max-width: 100% !important;
            }

            /* helper */
            .space-w-20 {
                width: 3.57% !important;
                max-width: 20px !important;
                min-width: 3.5% !important;
            }

            .space-w-20 td:first-child {
                width: 3.5% !important;
                max-width: 20px !important;
                min-width: 3.5% !important;
            }

            .space-w-25 {
                width: 4.45% !important;
                max-width: 25px !important;
                min-width: 4.45% !important;
            }

            .space-w-25 td:first-child {
                width: 4.45% !important;
                max-width: 25px !important;
                min-width: 4.45% !important;
            }

            .space-w-30 td:first-child {
                width: 5.35% !important;
                max-width: 30px !important;
                min-width: 5.35% !important;
            }

            .fix-w-20 {
                width: 20px !important;
                max-width: 20px !important;
                min-width: 20px !important;
            }

            .fix-w-20 td:first-child {
                width: 20px !important;
                max-width: 20px !important;
                min-width: 20px !important;
            }

            .h-10 {
                display: block !important;
                height: 10px !important;
            }

            .h-20 {
                display: block !important;
                height: 20px !important;
            }

            .h-30 {
                display: block !important;
                height: 30px !important;
            }

            .h-40 {
                display: block !important;
                height: 40px !important;
            }

            .remove-640 {
                display: none !important;
            }

            .text-left {
                text-align: left !important;
            }

            .clear-pad {
                padding: 0 !important;
            }
        }

        @media only screen and (max-width: 479px) {
            .container {
                width: 95% !important;
                max-width: 95% !important;
                min-width: 124px !important;
                padding-left: 15px !important;
                padding-right: 15px !important;
                text-align: center !important;
                clear: both;
            }

            .full-width,
            .full-width-479 {
                width: 100% !important;
                max-width: 100% !important;
                min-width: 124px !important;
                clear: both;
            }

            .full-width-center {
                width: 100% !important;
                max-width: 100% !important;
                min-width: 124px !important;
                text-align: center !important;
                clear: both;
                margin: 0 auto;
                float: none;
            }

            .auto-center-all {
                width: 100% !important;
                max-width: 100% !important;
                text-align: center !important;
                clear: both;
                margin: 0 auto;
                float: none;
            }

            .auto-center-all * {
                width: auto !important;
                max-width: 100% !important;
                text-align: center !important;
                clear: both;
                margin: 0 auto;
                float: none;
            }

            .col-3 {
                width: 100% !important;
                max-width: 100% !important;
                text-align: center !important;
                clear: both;
            }

            .col-3-not-full {
                width: 30.35% !important;
                max-width: 100% !important;
            }

            .col-2 {
                width: 100% !important;
                max-width: 100% !important;
                text-align: center !important;
                clear: both;
            }

            .full-block-479 {
                display: block !important;
                clear: both;
                padding-top: 10px;
                padding-bottom: 10px;
            }

            /* image */
            .image-full-width img {
                width: 100% !important;
                height: auto !important;
                max-width: 100% !important;
                min-width: 124px !important;
            }

            .image-min-80 img {
                width: 100% !important;
                height: auto !important;
                max-width: 100% !important;
                min-width: 80px !important;
            }

            .image-min-100 img {
                width: 100% !important;
                height: auto !important;
                max-width: 100% !important;
                min-width: 100px !important;
            }

            /* halper */
            .space-w-20 {
                width: 100% !important;
                max-width: 100% !important;
                min-width: 100% !important;
            }

            .space-w-20 td:first-child {
                width: 100% !important;
                max-width: 100% !important;
                min-width: 100% !important;
            }

            .space-w-25 {
                width: 100% !important;
                max-width: 100% !important;
                min-width: 100% !important;
            }

            .space-w-25 td:first-child {
                width: 100% !important;
                max-width: 100% !important;
                min-width: 100% !important;
            }

            .space-w-30 {
                width: 100% !important;
                max-width: 100% !important;
                min-width: 100% !important;
            }

            .space-w-30 td:first-child {
                width: 100% !important;
                max-width: 100% !important;
                min-width: 100% !important;
            }

            .remove-479 {
                display: none !important;
            }

            img {
                max-width: 280px !important;
            }

            .resize-font,
            .resize-font * {
                font-size: 37px !important;
                line-height: 48px !important;
            }
        }

        /* End Old CSS */

        @media only screen and (max-width:640px) {

            .full-width,
            .container {
                width: 95% !important;
                float: none !important;
                min-width: 95% !important;
                max-width: 95% !important;
                margin: 0 auto !important;
                padding-left: 15px;
                padding-right: 15px;
                text-align: center !important;
                clear: both;
            }

            #mainStructure,
            #mainStructure .full-width .full-width,
            table .full-width .full-width,
            .container .full-width {
                width: 100% !important;
                float: none !important;
                min-width: 100% !important;
                max-width: 100% !important;
                margin: 0 auto !important;
                clear: both;
                padding-left: 0;
                padding-right: 0;
            }

            .no-pad {
                padding: 0 !important;
            }

            .full-block {
                display: block !important;
            }

            .image-full-width,
            .image-full-width img {
                width: 100% !important;
                height: auto !important;
                max-width: 100% !important;
                min-width: 100px !important;
            }

            .full-width.fix-800 {
                min-width: auto !important;
            }

            .remove-block {
                display: none !important;
                padding-top: 0px;
                padding-bottom: 0px;
            }

            .pad-lr-20 {
                padding-left: 20px !important;
                padding-right: 20px !important;
            }

            .row {
                display: table-row !important;
            }
        }

        @media only screen and (max-width:480px) {

            .full-width,
            .container {
                width: 95% !important;
                float: none !important;
                min-width: 95% !important;
                max-width: 95% !important;
                margin: 0 auto !important;
                padding-left: 15px;
                padding-right: 15px;
                text-align: center !important;
                clear: both;
            }

            #mainStructure,
            #mainStructure .full-width .full-width,
            table .full-width .full-width,
            .container .full-width {
                width: 100% !important;
                float: none !important;
                min-width: 100% !important;
                max-width: 100% !important;
                margin: 0 auto !important;
                clear: both;
                padding-left: 0;
                padding-right: 0;
            }

            .no-pad {
                padding: 0 !important;
            }

            .full-block {
                display: block !important;
            }

            .image-full-width,
            .image-full-width img {
                width: 100% !important;
                height: auto !important;
                max-width: 100% !important;
                min-width: 100px !important;
            }

            .full-width.fix-800 {
                min-width: auto !important;
            }

            .remove-block {
                display: none !important;
                padding-top: 0px;
                padding-bottom: 0px;
            }

            .pad-lr-20 {
                padding-left: 20px !important;
                padding-right: 20px !important;
            }

            .row {
                display: table-row !important;
            }
        }

        td ul {
            list-style: initial;
            margin: 0;
            padding-left: 20px;
        }

        body {
            background-color: #ffffff;
            margin: 0 auto !important;
            height: auto !important;
        }

        #preview-template #mainStructure {
            padding: 20px 0px 60px 0px !important;
        }

        .default-edit-image {
            height: 20px;
        }

        tr.tpl-repeatblock,
        tr.tpl-repeatblock>td {
            display: block !important;
        }

        .tpl-repeatblock {
            padding: 0px !important;
            border: 1px dotted rgba(0, 0, 0, 0.2);
        }

        @media only screen and (max-width: 640px) {
            .full-block {
                display: table !important;
                padding-top: 0px;
                padding-bottom: 0px;
            }

            .row {
                display: table-row !important;
            }

            .image-100-percent img {
                width: 100% !important;
                height: auto !important;
                max-width: 100% !important;
                min-width: 124px !important;
            }
        }

        @media only screen and (max-width: 480px) {
            .full-block {
                display: table !important;
                padding-top: 0px;
                padding-bottom: 0px;
            }

            .row {
                display: table-row !important;
            }
        }


        *[x-apple-data-detectors],
        .unstyle-auto-detected-links *,

        .aBn {
            border-bottom: 0 !important;
            cursor: default !important;
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
        }

        .im {
            color: inherit !important;
        }

        .a6S {
            display: none !important;
            opacity: 0.01 !important;
        }

        img.g-img+div {
            display: none !important;
        }

        img {
            height: auto !important;
            line-height: 100%;
            outline: none;
            text-decoration: none !important;
            -ms-interpolation-mode: bicubic;
        }

        a img {
            border: 0 !important;
        }

        a:active {
            color: initial
        }

        a:visited {
            color: initial
        }

        span a,
        a {
            color: inherit;
            text-decoration: none !important;
        }

        .tpl-content {
            padding: 0 !important;
        }

        table td {
            border-collapse: unset;
        }

        table p {
            margin: 0;
        }

        table,
        img {
            min-width: 0 !important;
        }

        #mainStructure {
            padding: 0 !important;
        }

        .row th {
            display: table-cell;
        }

        .row {
            display: flex;
        }
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

<body style="font-size:12px; width:100%; height:100%;">
    <table id="mainStructure" class="full-width" width="800" align="center" border="0" cellspacing="0" cellpadding="0"
        style="background-color: #ffffff; max-width: 800px; outline: rgb(239, 239, 239) solid 1px; box-shadow: rgb(224, 224, 224) 0px 0px 30px 5px; margin: 0px auto;"
        bgcolor="#ffffff">
        <!-- START LAYOUT-3 ( HEADER / TEXT / BACKGROUND-IMAGE ) -->
        <tr>
            <td valign="top" align="center" style="background-color: #e9eff4;" bgcolor="#e9eff4">
                <!-- start container -->
                <table width="600" align="center" border="0" cellspacing="0" cellpadding="0" class="full-width"
                    style="background-color: #e9eff4; margin: 0px auto; width: 600px; min-width: 320px; max-width: 90%;"
                    role="presentation" bgcolor="#e9eff4">
                    <tr>
                        <td valign="top" align="center">
                            <table width="560" border="0" cellspacing="0" cellpadding="0" align="center"
                                class="full-width"
                                style="margin: 0px auto; width: 560px; min-width: 280px; max-width: 90%;"
                                role="presentation">
                                <!-- start space -->
                                <tr>
                                    <td valign="top" height="50" style="height: 50px; font-size: 0px; line-height: 0;"
                                        aria-hidden="true">&nbsp;</td>
                                </tr><!-- end space -->
                                <tr>
                                    <td valign="top" align="center">
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center"
                                            style="margin: 0px auto; min-width: 100%;" role="presentation">
                                            <tr>
                                                <td valign="top" align="center">
                                                    <table width="auto" align="center" border="0" cellspacing="0"
                                                        cellpadding="0"
                                                        style="margin: 0px auto;mso-table-lspace:0pt; mso-table-rspace:0pt;"
                                                        role="presentation">
                                                        <tr>
                                                            <td align="center" valign="top" width="200"
                                                                style="width: 200px; line-height: 0px;"> <img
                                                                    src="https://res.cloudinary.com/fenixsorbil/image/upload/v1564173689/Assets/logo_u1mpzc.png"
                                                                    width="200"
                                                                    style="max-width: 200px; height: auto; display: block !important;"
                                                                    alt="icon-logo" border="0" hspace="0" vspace="0"
                                                                    height="auto"></td>
                                                        </tr><!-- start space -->
                                                        <tr>
                                                            <td valign="top" height="20"
                                                                style="height: 20px; font-size: 0px; line-height: 0;"
                                                                aria-hidden="true">&nbsp;</td>
                                                        </tr><!-- end space -->
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td valign="top" align="center">
                                                    <table width="100%" align="center" border="0" cellspacing="0"
                                                        cellpadding="0" style="margin: 0px auto; min-width: 100%;"
                                                        role="presentation">
                                                        <tr>
                                                            <td align="center"
                                                                style="font-size: 28px; color: #333333; font-weight: normal; font-family: 'Open Sans', Arial, Helvetica, sans-serif; word-break: break-word; line-height: 1;">
                                                                <span
                                                                    style="color: #333333; font-style: normal; text-align: center; line-height: 34px; font-size: 28px; font-weight: 400; font-family: 'Open Sans', Arial, Helvetica, sans-serif;">¡Bienvenido
                                                                    a Sorbil!<br><span
                                                                        style="color: #ff900e; font-style: normal; text-align: center; line-height: 34px; font-size: 28px; font-weight: 700; font-family: 'Open Sans', Arial, Helvetica, sans-serif;"><span
                                                                            style="color: #333399; font-style: normal; text-align: center; line-height: 44px; font-size: 40px; font-weight: 700; font-family: 'Open Sans', Arial, Helvetica, sans-serif;"><span
                                                                                style="font-style: normal; text-align: center; color: #333399; line-height: 44px; font-size: 40px; font-weight: 700; font-family: 'Open Sans', Arial, Helvetica, sans-serif;">Tu
                                                                                librería
                                                                                digital</span></span><br></span></span>
                                                            </td>
                                                        </tr><!-- start space -->
                                                        <tr>
                                                            <td valign="top" height="10"
                                                                style="height: 10px; font-size: 0px; line-height: 0;"
                                                                aria-hidden="true">&nbsp;</td>
                                                        </tr><!-- end space -->
                                                    </table>
                                                </td>
                                            </tr>
                                            <!--start button-->
                                            <tr>
                                                <td valign="top" align="center">
                                                    <table width="auto" align="center" border="0" cellspacing="0"
                                                        cellpadding="0"
                                                        style="text-align: center; margin: 0px auto;mso-table-lspace:0pt; mso-table-rspace:0pt;"
                                                        role="presentation">
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
                                                <td valign="top" height="20"
                                                    style="height: 20px; font-size: 0px; line-height: 0;"
                                                    aria-hidden="true">&nbsp;</td>
                                            </tr><!-- end space -->
                                            <!-- start header image -->
                                            <tr>
                                                <td valign="top" align="center">
                                                    <table width="100%" align="center" border="0" cellspacing="0"
                                                        cellpadding="0" style="margin: 0px auto; min-width: 100%;"
                                                        role="presentation">
                                                        <tr>
                                                            <td align="center" valign="top" class="image-full-width"
                                                                width="560" style="width: 560px; line-height: 0px;">
                                                                <img src="https://res.cloudinary.com/fenixsorbil/image/upload/v1564174468/Assets/undraw_studying_s3l7-_1_mw3doo.png"
                                                                    width="560"
                                                                    style="height: auto; display: block !important; width: 100%; max-width: 560px; min-width: 100%;"
                                                                    alt="header-image" border="0" hspace="0" vspace="0"
                                                                    height="auto"></td>
                                                        </tr><!-- start space -->
                                                        <tr>
                                                            <td valign="top" height="20"
                                                                style="height: 20px; font-size: 0px; line-height: 0;"
                                                                aria-hidden="true">&nbsp;</td>
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
    </table>
</body>

</html>
                    `
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
                    msj: 'El club de lectura se registró con éxito'
                });
            }
        }
    );
});

router.get('/listar-clubes', function (req, res) {
    Club.find(function (err, clubesDB) {
        if (err) {
            return res.status(400).json({
                success: false,
                msj: 'No se pueden listar los clubes',
                err
            });
        } else {
            return res.json({
                success: true,
                lista_clubes: clubesDB
            });
        }
    })
});

router.get('/buscar-club-id/:_id', function (req, res) {
    Club.findById(req.body._id, function (err, clubDB) {
        if (err) {
            return res.status(400).json({
                success: false,
                msj: 'No se encontro ningun club con ese _id.',
                err
            });
        } else {
            return res.json({
                success: true,
                club: clubDB
            });
        }
    })
});

router.post('/agregar-usuario-club', function(req, res) {
    Club.update({ _id: req.body._id }, {
            $push:{ 
                'usuarios': {
                    usuario_id: req.body.usuario_id,
                    nombre: req.body.nombre,
                    correo: req.body.correo  
                }
            }
        },
        function(error){
            if (error) {
                return res.status(400).json({
                    success: false,
                    msj: 'No se pudo agregar el usuario al club',
                    error
                });
            } else{
                res.json({
                    success: true,
                    msj: 'El usuario se agregó con éxito'
                });
            }
        }
    )
});

router.post('/deshabilitar-club', function (req, res) {
    let body = req.body;

    Club.findByIdAndUpdate(body._id, {
        $set: {
            estado: 'deshabilitado'
        }
    },
        function (error) {
            if (error) {
                res.json({ success: false, msg: 'No se pudo deshabilitar el club' });
            } else {
                res.json({ success: true, msg: 'El club se deshabilitó con éxito' });
            }
        }
    )
});

router.post('/habilitar-club', function (req, res) {
    let body = req.body;

    Club.findByIdAndUpdate(body._id, {
        $set: {
            estado: 'habilitado'
        }
    },
        function (error) {
            if (error) {
                res.json({ success: false, msg: 'No se pudo habilitar el club' });
            } else {
                res.json({ success: true, msg: 'El club se habilitó con éxito' });
            }
        }
    )
});

router.post('/modificar-club-presencial', function (req, res) {
    let body = req.body;

    Club.findByIdAndUpdate(body._id, {
        $set: {
            imagen: body.imagen,
            tipo: body.tipo,
            nombre: body.nombre,
            tema: body.tema,
            correo: body.correo,
            telefono: body.telefono,
            categoria: body.categoria,
            genero: body.genero,
            fecha: body.fecha,
            hora: body.hora,
            frecuencia: body.frecuencia,
            descripcion: body.descripcion,
            direccion_exacta: body.direccion_exacta,
        }
    },
        function (error) {
            if (error) {
                res.json({ success: false, msg: 'No se pudo modificar el club' });
            } else {
                res.json({ success: true, msg: 'El club se modificó con éxito' });
            }
        }
    )
});

router.post('/eliminar-club', function (req, res) {
    let body = req.body;

    Club.findByIdAndRemove(body._id,
        function (error) {
            if (error) {
                res.json({ success: false, msg: 'No se pudo eliminar el club' });
            } else {
                res.json({ success: true, msg: 'El club se eliminó con éxito' });
            }
        }
    )
});

module.exports = router;
