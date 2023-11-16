var express = require('express');
var router = express.Router();
var nodemailer =require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', async(req, res, next) => {

  var nombre = req.body.nombre;
  var email= req.body.email;
  var telefono= req.body.tel;
  var mensaje= req.body.mensaje;

  var obj = {
    to: 'ema.pintos01@gmail.com' ,
    subject:'Contacto desde la web',
    html: nombre  + ' Se contacto desde la web y quiere mas info a este correo: ' + email + ' <br> Además hizo el siguiente comentario :' + mensaje + ' <br> Su telefono es: '+ telefono

  }

  var transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth:{
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  })

  var info = await transporter.sendMail(obj);

  res.render('index', {
    message: 'Mensaje enviado',
  });
});

module.exports = router;
