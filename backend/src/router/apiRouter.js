'use strict';

const router = require('express').Router();
const controller = require('../controller/controller');
var options = {
    inflate: true,
    limit: '100kb',
    type: 'application/octet-stream'
  };
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
router.use(bodyParser.raw(options));
router.use((req, res, next) => {
    res.payload = {};
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader('Access-Control-Allow-Credentials', true)
    next();
  });
  




router.post('/login',(req, res, next)=>
controller.getRawBody(req)
.then(memberDetails=>{
      return controller.login(JSON.parse(memberDetails))
}).then(result=>{
     res.send(result);    
})
.catch(next));


router.post('/register',(req, res, next)=>
controller.getRawBody(req)
.then(memberDetails=>{
      return controller.register(JSON.parse(memberDetails))
}).then(result=>{
     res.send(result);    
})
.catch(next));




router.post('/ajouterMedecin',(req, res, next)=>
controller.getRawBody(req)
.then(details=>{
    res.payload.paiement = JSON.parse(details).paiement
    return controller.register(JSON.parse(details).medecin)
}).then(result=>{
    let paiement = res.payload.paiement
    console.log (result.memberId)
    return controller.ajouterPaiement( paiement ,result.memberId )
}).then(result=>{
     res.send(result);    
})
.catch(next));




router.post('/editMedecin',(req, res, next)=>
controller.getRawBody(req)
.then(details=>{

    return controller.editMedecin(JSON.parse(details))
}).then(result=>{
     res.send(result);    
})
.catch(next));




router.get('/getUserById',urlencodedParser, (req, res, next) => 
controller.getUserById(req.query.id)
.then(data=>{
    res.send(data);
})
.catch(next));



router.get('/getAllMedecin',urlencodedParser, (req, res, next) => 
controller.getAllMedecin()
.then(data=>{
    res.send(data);
})
.catch(next));



router.get('/getAllPatients',urlencodedParser, (req, res, next) => 
controller.getAllPatient()
.then(data=>{
    res.send(data);
})
.catch(next));


router.get('/getAllMedecinRequest',urlencodedParser, (req, res, next) => 
controller.getAllMedecinRequest()
.then(data=>{
    res.send(data);
})
.catch(next));



router.get('/getAllPatient',urlencodedParser, (req, res, next) => 
controller.getAllPatient()
.then(data=>{
    res.send(data);
})
.catch(next));



router.get('/getAllPatientByMedecinId',urlencodedParser, (req, res, next) => 
controller.getAllPatientByMedecinId(req.query.id)
.then(data=>{
    res.send(data);
})
.catch(next));





router.get('/getAllAppointmentSuggestionByMedecinId',urlencodedParser, (req, res, next) => 
controller.getAllAppointmentSuggestionByMedecinId(req.query.id)
.then(data=>{
    res.send(data);
})
.catch(next));






router.get('/getAllAppointmentByMedecinId',urlencodedParser, (req, res, next) => 
controller.getAllAppointmentByMedecinId(req.query.id)
.then(data=>{
    res.send(data);
})
.catch(next));



router.get('/accepterAppointment',urlencodedParser, (req, res, next) => 
controller.accepterAppointment(req.query.id)
.then(data=>{
    return controller.sendEmailToNotifierPatient(req.query.email ,"accepter" , req.query.medecin)
  })
.then(data=>{
    res.send(data);
})
.catch(next));




router.get('/refuseAppointmentSuggestion',urlencodedParser, (req, res, next) => 
controller.refuseAppointmentSuggestion(req.query.id)
.then(data=>{
    return controller.sendEmailToNotifierPatient(req.query.email ,"refuser" , req.query.medecin)
})
.then(data=>{
    res.send(data);
})
.catch(next));



router.get('/accepterComment',urlencodedParser, (req, res, next) => 
controller.accepterComment(req.query.id)
.then(data=>{
    res.send(data);
})
.catch(next));


router.get('/getAllReclamation',urlencodedParser, (req, res, next) => 
controller.getAllReclamation()
.then(data=>{
    res.send(data);
})
.catch(next));




router.get('/getAllCommentsEnAttente',urlencodedParser, (req, res, next) => 
controller.getAllComments()
.then(data=>{
    res.send(data);
})
.catch(next));



router.get('/getAllMedecinComments',urlencodedParser, (req, res, next) => 
controller.getAllMedecinComments(req.query.id)
.then(data=>{
    res.send(data);
})
.catch(next));



router.get('/deleteComment',urlencodedParser, (req, res, next) => 
controller.deleteComment(req.query.id)
.then(data=>{
    res.send(data);
})
.catch(next));



router.get('/disableMedecin',urlencodedParser, (req, res, next) => 
controller.disableMedecin(req.query.id)
.then(data=>{
    res.send(data);
})
.catch(next));




router.get('/enableMedecin',urlencodedParser, (req, res, next) => 
controller.enableMedecin(req.query.id)
.then(data=>{
    res.send(data);
})
.catch(next));





router.get('/archiverReclamation',urlencodedParser, (req, res, next) => 
controller.archiverReclamation(req.query.id)
.then(data=>{
    res.send(data);
})
.catch(next));





router.get('/repondreComment',urlencodedParser, (req, res, next) => 
controller.repondreComment(req.query.id , req.query.reponse)
.then(data=>{
    res.send(data);
})
.catch(next));



router.post('/ajouterAppointement',(req, res, next)=>
controller.getRawBody(req)
.then(comment=>{
      return controller.ajouterAppointement(JSON.parse(comment))
}).then(result=>{
     res.send(result);    
})
.catch(next));

router.post('/ajouterComment',(req, res, next)=>
controller.getRawBody(req)
.then(comment=>{
      return controller.ajouterComment(JSON.parse(comment))
}).then(result=>{
     res.send(result);    
})
.catch(next));




router.post('/ajouter_reclamation',(req, res, next)=>
controller.getRawBody(req)
.then(reclamation=>{
      return controller.ajouter_reclamation(JSON.parse(reclamation))
}).then(result=>{
     res.send(result);    
})
.catch(next));







// uploading layout Image
router.post("/uploadImageMedecin",
controller.uploadStorageImageMedecin.single("file"), (req, res) =>{
   try {
  
     res.send(req.file);
   } catch (error) {
     console.log(error);
     res.send(400);
   }
 });
 


// uploading layout Image
router.post("/uploadPreuve",
controller.uploadStoragePreuve.single("file"), (req, res) =>{
   try {
  
     res.send(req.file);
   } catch (error) {
     console.log(error);
     res.send(400);
   }
 });
 


 
 const { path_Image_medecin, path_preuve } = require('../config');

router.get('/getImage', (req, res) => {
    const dir = path_Image_medecin;
    res.sendFile(dir +'/'+ req.query.name); 
 });


 router.get('/getPreuve', (req, res) => {
  const dir = path_preuve;
  res.sendFile(dir +'/'+ req.query.name); 
});





router.get('/accepterMedecin',urlencodedParser, (req, res, next) => 
controller.accepterRequestMedecin(req.query.id)
.then(data=>{
   return controller.sendEmailToNotifierMedecin(req.query.email ,"accepté vous pouvez maintenant connectez sur notre plateforme" )
  })
.then(data=>{
    res.send(data);
})
.catch(next));




router.get('/refuserMedecin',urlencodedParser, (req, res, next) => 
controller.refuserRequestMedecin(req.query.id)
.then(data=>{
    return controller.sendEmailToNotifierMedecin(req.query.email ,"refusé" )
  })
.then(data=>{
    res.send(data);
})
.catch(next));




router.get('/deleteMedecin',urlencodedParser, (req, res, next) => 
controller.refuserRequestMedecin(req.query.id)
.then(data=>{
    res.send(data);
})
.catch(next));




router.get('/updateImageMedecin',urlencodedParser, (req, res, next) => 
controller.editImageMedecin(req.query.image , req.query.id)
.then(data=>{
    res.send(data);
})
.catch(next));





router.get('/checkEmailExists',(req, res, next)=>
controller.checkEmailExists(req.query.email)
.then(result=>{
  res.send(result);    
})
.catch(next));


module.exports = router;


