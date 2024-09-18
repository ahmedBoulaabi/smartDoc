import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { getElement } from "devextreme-angular";
import { users } from "src/app/lib/dummy";
import { IUser } from "src/app/models/user";
import { Service } from "src/app/services/service";
import Swal from "sweetalert2";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.css"],
})
export class LandingComponent implements OnInit {
 
  recentSearch: any[];
  reclamationForm: FormGroup;
  constructor(private service:Service) {

    this.reclamationForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      message: new FormControl("", [Validators.required]),
    });
  
  }

  ngOnInit(): void {
    this.getAllMedecins()
  }

  
  getAllMedecins(){


    this.service.getAllMedecin().subscribe(
      (data: any) => {
        if (data !== undefined) {
          let newList =[]


          data.forEach(element => {
            element.profilePic = element.imageMedecin ? "http://localhost:3008/api/getImage?name="+element.id+element.imageMedecin.substring(element.imageMedecin.indexOf('.')) : "assets/img/doctors/doctor_default_male.jpg";
        
            newList.push(element)
          });

          this.getRecentSearch(newList)
        }
      },
      (err) => {
        console.log(err);
      });

  }

  getRecentSearch(listMeds) {

    
    //top 4 doctors
    let listSearh=[]
    if (listMeds.length > 4){
      for (let index = 0; index <4; index++) {
        const element = listMeds[index];
        listSearh.push(element)
        
      }
      this.recentSearch = listSearh
    }
   else{
    this.recentSearch = listMeds
   

   }

     
  }

  submitReclamation() {
    let formObj = this.reclamationForm.getRawValue();
    
     

   this.service.ajouter_reclamation(formObj).subscribe(
    (data:any)=>{
 
      if(data){

        Swal.fire("Succès!", "Reclamation envoyé avec succés à l'administarteur de notre plateforme", "success");

        this.reclamationForm.reset();
      }
       
       
     },err=>{
       Swal.fire({
         title: 'Erreur!',
         text: 'Vérifier votre informations, essayez une autre fois!',
         icon: 'error',
         confirmButtonText: 'OK'
       })
       
     });
  }
}
