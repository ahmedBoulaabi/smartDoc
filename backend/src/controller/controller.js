'use strict';

const _publics = {};
var config = require('../config');
var getRawBody = require('raw-body');
const { path_Image_medecin, path_preuve } = require('../config');
var pool=config.pool;

const multer = require("multer")
const fs = require('fs');


var config = require('../config');
_publics.getRawBody = (req) => {
  return new Promise((resolve, reject) => {
    getRawBody(req, {
      length: req.headers['content-length'],
      limit: '1mb',
    }, function (err, string) {
      if (err) return next(err)
      req.text = string;
      return resolve(req.text);
    })
  });
};




_publics.login = (member) => {

  var memberDetails={}
  var email = member.email;
  var password = member.password;

  return new Promise((resolve, reject) => {

    var sql = "select u.* , r.type as role FROM member u left join role r on (r.id= u.id_role ) where u.email = ? and u.password = ? and status=1";
    pool.getConnection(function(err,connection){ 
      if (err) {  
      reject(err);
      }
      connection.query(sql, [email, password], function (err, members) {
        connection.release(); 
      var members = JSON.stringify(members);
      members = JSON.parse(members);

      if (err) {
        return reject();
      } else if (members[0] === undefined || (members[0].password !== password)) {
        memberDetails = {
          status: 403
        };
       
      } else {
        memberDetails = {
          member: members[0],
          status: 200,
        };
      }
      return resolve(memberDetails);
    });
  });
});
};





_publics.sendEmailToNotifierPatient = (email , state , medecin) => { 

 
  return new Promise((resolve, reject) => { 
    var msg="";
    config.transporter.sendMail({
      from: 'smart.doctorpfe2022@gmail.com',
        to: email,
        subject: "Notification Etat Rendez-vous",
        html: '<h3>Bonjour Monsieur/Madame '+' , \n \n </h3>'+
       "<p>Bienvenue sur notre plateforme  \n \n </p>"+
       '<p>'+' \n </p>'+
        "<p> Votre rendez-vous chez le medecin "+medecin +" est "+state+" \n </p>"+
        "<p> Cordialement \n </p>"
      },(error, info) => {
        if(error){
          reject(error);
          msg="failure"
        }else{
          msg={msg:"success"}
        }   
        return resolve(msg)
      });
    })
  }



  

_publics.sendEmailToNotifierMedecin = (email , state ) => { 

 
  return new Promise((resolve, reject) => { 
    var msg="";
    config.transporter.sendMail({
      from: 'smart.doctorpfe2022@gmail.com',
        to: email,
        subject: "Notification Etat de demande d'inscription",
        html: '<h3>Bonjour Monsieur/Madame '+' , \n \n </h3>'+
       "<p>Bienvenue sur notre plateforme  \n \n </p>"+
       '<p>'+' \n </p>'+
        "<p> Nous voulons vous informez que votre demande d'inscription est  "+state+" \n </p>"+
        "<p> Cordialement \n </p>"
      },(error, info) => {
        if(error){
          reject(error);
          msg="failure"
        }else{
          msg={msg:"success"}
        }   
        return resolve(msg)
      });
    })
  }


  
  





_publics.register = ( user) => {

  var firstName = user.firstName;
  var lastName = user.lastName;
  var email = user.email;
  var phone = user.phone;
  var address = user.address;
  var password  = user.password ;
  var speciality   = user.speciality  ; 
  var fax  = user.fax ;
  var url   = user.url  ;
  var medecinPackage = user.medecinPackage;
  var imageMedecin = user.imageMedecin;
  var status = user.status;
  var id_role   = user.id_role  ;


  return new Promise((resolve, reject) => {
    var message = {};
    var sql = "INSERT INTO member SET ? ";
    const newEmploye = { firstName,  lastName , email , phone , password,address ,speciality ,fax ,  url ,medecinPackage ,imageMedecin ,status,  id_role};
    pool.getConnection(function(err,connection){ 
      if (err) {  
      reject(err);
      }
      connection.query(sql, newEmploye, function (err, result) {
        connection.release(); 
      if (err) {
        message ={msg:"failure"};
        reject(err);
      } else {
        message = {msg:"success", memberId:result.insertId};
      }
      return resolve(message);
    });
  });
  });
};




_publics.getUserById = (id) => {

  return new Promise((resolve, reject) => {
    var sql = "select m.* , r.type from member m left join role r on (r.id = m.id_role) where m.id=? ";
    pool.getConnection(function(err,connection){ 
      if (err) {  
      reject(err);
      }
      connection.query(sql,[id], function (err, result) {
        connection.release(); 
      if (err) reject(err);
      return resolve(result[0]);
    });
  });
});
};



_publics.getAllMedecin = () => {

  return new Promise((resolve, reject) => {
    var sql = "select * from member where id_role=1 and status=1";
    pool.getConnection(function(err,connection){ 
      if (err) {  
      reject(err);
      }
      connection.query(sql, function (err, result) {
        connection.release(); 
      if (err) reject(err);
      return resolve(result);
    });
  });
});
};




_publics.getAllPatients = () => {

  return new Promise((resolve, reject) => {
    var sql = "select * from member where id_role=3 ";
    pool.getConnection(function(err,connection){ 
      if (err) {  
      reject(err);
      }
      connection.query(sql, function (err, result) {
        connection.release(); 
      if (err) reject(err);
      return resolve(result);
    });
  });
});
};




_publics.getAllMedecinRequest = () => {

  return new Promise((resolve, reject) => {
    var sql = "select m.* , p.montant from member m left join paiement p on (p.id_medecin = m.id) where m.id_role=1 and m.status=0";
    pool.getConnection(function(err,connection){ 
      if (err) {  
      reject(err);
      }
      connection.query(sql, function (err, result) {
        connection.release(); 
      if (err) reject(err);
      return resolve(result);
    });
  });
});
};




_publics.getAllPatient = () => {

  return new Promise((resolve, reject) => {
    var sql = "select * from member where id_role=3";
    pool.getConnection(function(err,connection){ 
      if (err) {  
      reject(err);
      }
      connection.query(sql, function (err, result) {
        connection.release(); 
      if (err) reject(err);
      return resolve(result);
    });
  });
});
};




_publics.getAllPatientByMedecinId = (medecinId) => {

  return new Promise((resolve, reject) => {
    var sql = "select distinct m.* from appointment a left join member m  on (m.id = a.id_patient) where a.id_medecin=? and a.status=1";
    pool.getConnection(function(err,connection){ 
      if (err) {  
      reject(err);
      }
      connection.query(sql,[medecinId], function (err, result) {
        connection.release(); 
      if (err) reject(err);
      return resolve(result);
    });
  });
});
};



_publics.getAllAppointmentSuggestionByMedecinId = (medecinId) => {

  return new Promise((resolve, reject) => {
    var sql = "select m.firstName , m.lastName , m.email , m.phone  , a.* from appointment a left join member m  on (m.id = a.id_patient) where a.id_medecin=? and a.status=0";
    pool.getConnection(function(err,connection){ 
      if (err) {  
      reject(err);
      }
      connection.query(sql,[medecinId], function (err, result) {
        connection.release(); 
      if (err) reject(err);
      return resolve(result);
    });
  });
});
};


_publics.getAllAppointmentByMedecinId = (medecinId) => {

  return new Promise((resolve, reject) => {
    var sql = "select m.firstName , m.lastName , m.email , m.phone  , a.* from appointment a left join member m  on (m.id = a.id_patient) where a.id_medecin=? and a.status=1";
    pool.getConnection(function(err,connection){ 
      if (err) {  
      reject(err);
      }
      connection.query(sql,[medecinId], function (err, result) {
        connection.release(); 
      if (err) reject(err);
      return resolve(result);
    });
  });
});
};


_publics.refuseAppointmentSuggestion= (id) => {
 
  return new Promise((resolve, reject) => {
    var sql = "delete from appointment WHERE id = ?";
    var msg = "";
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err);
      }
      connection.query(sql, [id], function (err, result) {
        connection.release();
        if (err) {
          msg = "failure";
          reject(err);
        } else {
          msg = {msg:"success"};
        }
        return resolve(msg);
      });
    });
  });
};


_publics.getAllReclamation = () => {

  return new Promise((resolve, reject) => {
    var sql = "select   * from reclamation where isarchive=0   ";
    pool.getConnection(function(err,connection){ 
      if (err) {  
      reject(err);
      }
      connection.query(sql ,function (err, result) {
        connection.release(); 
      if (err) reject(err);
      return resolve(result);
    });
  });
});
};


_publics.deleteComment= (id) => {
 
  return new Promise((resolve, reject) => {
    var sql = "delete from comment WHERE id = ?";
    var msg = "";
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err);
      }
      connection.query(sql, [id], function (err, result) {
        connection.release();
        if (err) {
          msg = "failure";
          reject(err);
        } else {
          msg = {msg:"success"};
        }
        return resolve(msg);
      });
    });
  });
};


_publics.ajouterComment= (commentaires) => {

  var id_patient   = commentaires.id_patient  ;
  var id_medecin  = commentaires.id_medecin;
  var date  = new Date() ;
  var comment  = commentaires.commentaire ;
  var preuve = commentaires.preuve;

  return new Promise((resolve, reject) => {
    var message = {};
    var sql = "INSERT INTO comment SET ? ";
    const newCentre = { id_patient  ,id_medecin,  date , comment, preuve };
    pool.getConnection(function(err,connection){ 
      if (err) {  
      reject(err);
      }
      connection.query(sql, newCentre, function (err, result) {
        connection.release(); 
      if (err) {
        message ={msg:"failure"};
        reject(err);
      } else {
        message = {msg:"success", commentId:result.insertId};
      }
      return resolve(message);
    });
  });
  });
};



_publics.checkEmailExists = (email) => {

  return new Promise((resolve, reject) => {
    var sql = "select * from member where email = ? ";

    pool.getConnection(function(err,connection){ 
      if (err) {  
      reject(err);
      }
      connection.query(sql ,[email] , function (err, result) {
        connection.release(); 
      if (err) reject(err);
      return resolve(result);
    });
  });
});
};



_publics.ajouterAppointement= ( rendezVous) => {

  var id_patient   =rendezVous.id_patient ;
  var id_medecin  = rendezVous.id_medecin;
  var date_debut  = rendezVous.date_debut.substring(0, 10) + " "+rendezVous.date_debut.substring(11,19) ;
  var date_fin    = rendezVous.date_fin.substring(0, 10) + " "+rendezVous.date_fin.substring(11,19) ;
 


  return new Promise((resolve, reject) => {
    var message = {};
    var sql = "INSERT INTO appointment SET ? ";
    const newDemande = { id_patient  ,id_medecin,  date_debut , date_fin };
    pool.getConnection(function(err,connection){ 
      if (err) {  
      reject(err);
      }
      connection.query(sql, newDemande, function (err, result) {
        connection.release(); 
      if (err) {
        message ={msg:"failure"};
        reject(err);
      } else {
        message = {msg:"success", centreId:result.insertId};
      }
      return resolve(message);
    });
  });
  });
};





_publics.ajouter_reclamation= ( reclamation) => {

  var date   = new Date() ;
  var email  = reclamation.email ;
  var message  = reclamation.message ;

  return new Promise((resolve, reject) => {
    var messageRep = {};
    var sql = "INSERT INTO reclamation SET ? ";
    const newDemande = { date,  email , message };
    pool.getConnection(function(err,connection){ 
      if (err) {  
      reject(err);
      }
      connection.query(sql, newDemande, function (err, result) {
        connection.release(); 
      if (err) {
        messageRep ={msg:"failure"};
        reject(err);
      } else {
        messageRep = {msg:"success", centreId:result.insertId};
      }
      return resolve(messageRep);
    });
  });
  });
};







_publics.ajouterPaiement= ( paiement , id_medecin) => {

  var id_medecin  = id_medecin ;
  var numero_carte  = paiement.numero_carte ;
  var montant  = paiement.montant ;

  return new Promise((resolve, reject) => {
    var messageRep = {};
    var sql = "INSERT INTO paiement SET ? ";
    const newDemande = { id_medecin,  numero_carte , montant };
    pool.getConnection(function(err,connection){ 
      if (err) {  
      reject(err);
      }
      connection.query(sql, newDemande, function (err, result) {
        connection.release(); 
      if (err) {
        messageRep ={msg:"failure"};
        reject(err);
      } else {
        messageRep = {msg:"success", centreId:result.insertId};
      }
      return resolve(messageRep);
    });
  });
  });
};


_publics.accepterRequestMedecin = ( id) => {



  return new Promise((resolve, reject) => {
    var message = {};
    var sql = "update member SET   status=1  where id=?   ";
 
    pool.getConnection(function(err,connection){ 
      if (err) {  
      reject(err);
      }
      connection.query(sql, [id ], function (err, result) {
        connection.release(); 
      if (err) {
        message ={msg:"failure"};
        reject(err);
      } else {
        message = {msg:"success"};
      }
      return resolve(message);
    });
  });
  });
};




_publics.refuserRequestMedecin = ( id) => {



  return new Promise((resolve, reject) => {
    var message = {};
    var sql = "delete from member where id=?  ";
 
    pool.getConnection(function(err,connection){ 
      if (err) {  
      reject(err);
      }
      connection.query(sql, [id ], function (err, result) {
        connection.release(); 
      if (err) {
        message ={msg:"failure"};
        reject(err);
      } else {
        message = {msg:"success"};
      }
      return resolve(message);
    });
  });
  });
};









_publics.accepterAppointment = ( id) => {



  return new Promise((resolve, reject) => {
    var message = {};
    var sql = "update appointment SET   status=1  where id=?   ";
 
    pool.getConnection(function(err,connection){ 
      if (err) {  
      reject(err);
      }
      connection.query(sql, [id ], function (err, result) {
        connection.release(); 
      if (err) {
        message ={msg:"failure"};
        reject(err);
      } else {
        message = {msg:"success"};
      }
      return resolve(message);
    });
  });
  });
};



_publics.accepterComment= ( id) => {



  return new Promise((resolve, reject) => {
    var message = {};
    var sql = "update comment SET   status=1  where id=?   ";
 
    pool.getConnection(function(err,connection){ 
      if (err) {  
      reject(err);
      }
      connection.query(sql, [id ], function (err, result) {
        connection.release(); 
      if (err) {
        message ={msg:"failure"};
        reject(err);
      } else {
        message = {msg:"success"};
      }
      return resolve(message);
    });
  });
  });
};





_publics.disableMedecin= ( id) => {



  return new Promise((resolve, reject) => {
    var message = {};
    var sql = "update medecin SET   disabled=1  where id=?   ";
 
    pool.getConnection(function(err,connection){ 
      if (err) {  
      reject(err);
      }
      connection.query(sql, [id ], function (err, result) {
        connection.release(); 
      if (err) {
        message ={msg:"failure"};
        reject(err);
      } else {
        message = {msg:"success"};
      }
      return resolve(message);
    });
  });
  });
};




_publics.enableMedecin= ( id) => {



  return new Promise((resolve, reject) => {
    var message = {};
    var sql = "update medecin SET   disabled=0  where id=?   ";
 
    pool.getConnection(function(err,connection){ 
      if (err) {  
      reject(err);
      }
      connection.query(sql, [id ], function (err, result) {
        connection.release(); 
      if (err) {
        message ={msg:"failure"};
        reject(err);
      } else {
        message = {msg:"success"};
      }
      return resolve(message);
    });
  });
  });
};


_publics.archiverReclamation = ( id) => {


  return new Promise((resolve, reject) => {
    var message = {};
    var sql = "update reclamation  SET   isarchive=1  where id=?  ";
 
    pool.getConnection(function(err,connection){ 
      if (err) {  
      reject(err);
      }
      connection.query(sql, [id], function (err, result) {
        connection.release(); 
      if (err) {
        message ={msg:"failure"};
        reject(err);
      } else {
        message = {msg:"success"};
      }
      return resolve(message);
    });
  });
  });
};






_publics.editMedecin = ( user) => {

  var id= user.id
  var firstName = user.firstName;
  var lastName = user.lastName;
  var email = user.email;
  var phone = user.phone;
  var address = user.address;
  var speciality   = user.speciality  ; 
  var fax  = user.fax ;
  var url   = user.url  ;
 


  return new Promise((resolve, reject) => {
    var message = {};
    var sql = "update member  SET   firstName=? , lastName=? , email=? , phone=? , address=? , speciality=? , fax=? , url=?  where id=? ";
     pool.getConnection(function(err,connection){ 
      if (err) {  
      reject(err);
      }
      connection.query(sql, [firstName, lastName , email , phone ,  address , speciality , fax , url , id ], function (err, result) {
        connection.release(); 
      if (err) {
        message ={msg:"failure"};
        reject(err);
      } else {
        message = {msg:"success"};
      }
      return resolve(message);
    });
  });
  });
};






_publics.editImageMedecin = ( name , id) => {

 


  return new Promise((resolve, reject) => {
    var message = {};
    var sql = "update member  SET   imageMedecin=?   where id=? ";
     pool.getConnection(function(err,connection){ 
      if (err) {  
      reject(err);
      }
      connection.query(sql, [name , id ], function (err, result) {
        connection.release(); 
      if (err) {
        message ={msg:"failure"};
        reject(err);
      } else {
        message = {msg:"success"};
      }
      return resolve(message);
    });
  });
  });
};


_publics.repondreComment= ( id , reponse) => {



  return new Promise((resolve, reject) => {
    var message = {};
    var sql = "update comment SET   reponse=?  where id=?   ";
 
    pool.getConnection(function(err,connection){ 
      if (err) {  
      reject(err);
      }
      connection.query(sql, [reponse , id ], function (err, result) {
        connection.release(); 
      if (err) {
        message ={msg:"failure"};
        reject(err);
      } else {
        message = {msg:"success"};
      }
      return resolve(message);
    });
  });
  });
};






const storageImage=
multer.diskStorage({
  
  destination: (req, file, cb) => {
    const dir =path_Image_medecin ;
    if (!fs.existsSync(dir)) {
   
      fs.mkdir(dir, (err)=>{
        if (err) {
          throw err;
      }
      } )
    }
    
    cb(null, dir)  
  },
  filename: (req, file, cb) => {
    cb(null,  req.query.name)
  },
})








const storagePreuve=
multer.diskStorage({
  
  destination: (req, file, cb) => {
    const dir =path_preuve ;
    if (!fs.existsSync(dir)) {
   
      fs.mkdir(dir, (err)=>{
        if (err) {
          throw err;
      }
      } )
    }
    
    cb(null, dir)  
  },
  filename: (req, file, cb) => {
    cb(null,  req.query.name)
  },
})


_publics.uploadStorageImageMedecin= multer({ storage: storageImage }) 
_publics.uploadStoragePreuve= multer({ storage: storagePreuve }) 






_publics.getAllMedecinComments = (id) => {

  return new Promise((resolve, reject) => {
    var sql = "select   c.*  , p.email , p.firstName  , p.lastName from comment c left join member p on (p.id = c.id_patient)  where  c.id_medecin = ? and c.status=1  ";
    pool.getConnection(function(err,connection){ 
      if (err) {  
      reject(err);
      }
      connection.query(sql ,[id],function (err, result) {
        connection.release(); 
      if (err) reject(err);
      return resolve(result);
    });
  });
});
};



_publics.getAllComments = () => {

  return new Promise((resolve, reject) => {
    var sql = "select   c.*  , p.email , m.firstName  , m.lastName from comment c left join member p on (p.id = c.id_patient) left join member m on  (m.id = c.id_medecin ) where  c.status=0  ";
    pool.getConnection(function(err,connection){ 
      if (err) {  
      reject(err);
      }
      connection.query(sql ,function (err, result) {
        connection.release(); 
      if (err) reject(err);
      return resolve(result);
    });
  });
});
};




module.exports = _publics;