import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class Service {




 

private url:string='http://localhost:3008/api/';

constructor(private http:HttpClient){}



signin(user: any): Observable<any> {
  return this.http.post(this.url+'login' ,user );
}


register(user: any): Observable<any> {
    return this.http.post(this.url+'register' ,user );
  }



  
  ajouterMedecin(user: any): Observable<any> {
  return this.http.post(this.url+'ajouterMedecin' ,user );
}

   getUserById(id:any): Observable<any> {
    return this.http.get(this.url+'getUserById?id='+id);
  }
  


  getAllMedecin(): Observable<any> {
    return this.http.get(this.url+'getAllMedecin');
  }
  

  getAllPatients(): Observable<any> {
    return this.http.get(this.url+'getAllPatients');
  }


  getAllMedecinRequest(): Observable<any> {
    return this.http.get(this.url+'getAllMedecinRequest');
  }
  


  getAllPatient(): Observable<any> {
    return this.http.get(this.url+'getAllPatient');
  }


  getAllPatientByMedecinId(id:any): Observable<any> {
    return this.http.get(this.url+'getAllPatientByMedecinId?id='+id);
  }


  getAllAppointmentSuggestionByMedecinId(id:any): Observable<any> {
    return this.http.get(this.url+'getAllAppointmentSuggestionByMedecinId?id='+id);
  }


  getAllAppointmentByMedecinId(id:any): Observable<any> {
    return this.http.get(this.url+'getAllAppointmentByMedecinId?id='+id);
  }


  
  accepterAppointment(email:any , medecinId:any , id:any): Observable<any> {
    return this.http.get(this.url+'accepterAppointment?email='+email+"&medecin="+medecinId+"&id="+id);
  }


  
  refuserMedecin(email:any , id:any): Observable<any> {
    return this.http.get(this.url+'refuserMedecin?email='+email+"&id="+id);
  }


  deleteMedecin( id:any): Observable<any> {
    return this.http.get(this.url+'deleteMedecin?id='+id);
  }

  
  accepterMedecin(email:any , id:any): Observable<any> {
    return this.http.get(this.url+'accepterMedecin?email='+email+"&id="+id);
  }

  
  refuseAppointmentSuggestion(email:any , medecinId:any,id:any): Observable<any> {
    return this.http.get(this.url+'refuseAppointmentSuggestion?email='+email+"&medecin="+medecinId+"&id="+id);
  }

  accepterComment(id:any): Observable<any> {
    return this.http.get(this.url+'accepterComment?id='+id);
  }

  
  getAllReclamation(): Observable<any> {
    return this.http.get(this.url+'getAllReclamation');
  }



  getAllCommentsEnAttente(): Observable<any> {
    return this.http.get(this.url+'getAllCommentsEnAttente');
  }


  deleteComment(id:any): Observable<any> {
    return this.http.get(this.url+'deleteComment?id='+id);
  }

  

  disableMedecin(id:any): Observable<any> {
    return this.http.get(this.url+'disableMedecin?id='+id);
  }


  

  enableMedecin(id:any): Observable<any> {
    return this.http.get(this.url+'enableMedecin?id='+id);
  }


  

  archiverReclamation(id:any): Observable<any> {
    return this.http.get(this.url+'archiverReclamation?id='+id);
  }



  

  repondreComment(id:any , reponse:any): Observable<any> {
    return this.http.get(this.url+'repondreComment?id='+id+"&reponse="+reponse);
  }


  checkEmailExists(email: any) {
    return this.http.get(this.url+'checkEmailExists?email='+email );
  }
  
  
  ajouterComment(user: any): Observable<any> {
    return this.http.post(this.url+'ajouterComment' ,user );
  }

  ajouterAppointement(user: any): Observable<any> {
    return this.http.post(this.url+'ajouterAppointement' ,user );
  }
  
  
  ajouter_reclamation(user: any): Observable<any> {
    return this.http.post(this.url+'ajouter_reclamation' ,user );
  }




  

  editMedecin(data:any): Observable<any> {
  return this.http.post(this.url+ 'editMedecin', data );
}
  


uploadImageMedecin(file:any ,name: any): Observable<any> {
  return this.http.post(this.url+ 'uploadImageMedecin?name='+name, file );
}
   

updateImageMedecin(id:any ,name: any): Observable<any> {
  return this.http.get(this.url+ 'updateImageMedecin?image='+name+"&id="+id );
}
  

getAllMedecinComments(id:any ): Observable<any> {
  return this.http.get(this.url+"getAllMedecinComments?id="+id );
}
  


uploadPreuve(file:any ,name: any): Observable<any> {
  return this.http.post(this.url+ 'uploadPreuve?name='+name, file );
}
  
  

getPreuve(name):Observable<any>{
  return this.http.get(this.url+'getPreuve?name='+name , {"responseType": 'blob'});
}



}
