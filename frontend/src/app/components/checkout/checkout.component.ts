import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import DataSource from "devextreme/data/data_source";
import notify from "devextreme/ui/notify";
import { Service } from "src/app/services/service";
import Swal from "sweetalert2";


@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.css"],
})
export class CheckoutComponent implements OnInit {
  checkoutForm:FormGroup;
  constructor(
    private service:Service,
    private router: Router ,
    public dialogRef: MatDialogRef<CheckoutComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.checkoutForm = new FormGroup({
      montant: new FormControl("", [Validators.required]),
      numero_carte: new FormControl("", [Validators.required]),
    });
    
  }
  ngOnInit(): void {
   
  }


  
    
  checkEmailExist(email , details){
    this.service.checkEmailExists(email).subscribe(
      (data: any) => {
        if (data.length>0) {
        

           
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Email exist deja!',
         
          })
         
         
        }
        else{

          this.registerMedecin(details)
        }
      },
      (err) => {
        console.log(err);
      }
    );

  }
  
  registerMedecin(details){


    this.service.ajouterMedecin(details).subscribe(
      (data:any)=>{
   
        if(data){
  
          Swal.fire("Succès!", "Compte enregistré avec succès! ", "success");
          this.router.navigate(['auth/login']);
  
          this.dialogRef.close();
  
         
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
  
  confirmer(){

    
    this.data.data.id_role=1;
    this.data.data.status=0 ;

    let paiement = {
      numero_carte:this.checkoutForm.value.numero_carte,
      montant:this.checkoutForm.value.montant
    }


    let details= {
      "paiement":paiement,
       "medecin": this.data.data  
     }
   
     this.checkEmailExist(details.medecin.email ,details )

  }

}
