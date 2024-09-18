

var mysql = require('mysql');
var nodemailer = require('nodemailer');
module.exports = {
  port: process.env.PORT || 3008,
  env: process.env.NODE_ENV || 'development',
  mediane: 6,



  path_Image_medecin: 'D:/projet/to ahmed/to ahmed/imageMedecin',
  path_preuve: 'D:/projet/to ahmed/to ahmed/preuve',


  pool: mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'jameda',
    debug: false
  }),


  transporter : nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'smart.doctorpfe2022@gmail.com',
      pass: 'mrsmokenew123'
    }
})
};

