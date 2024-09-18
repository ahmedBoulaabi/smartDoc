import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { CheckoutComponent } from "src/app/components/checkout/checkout.component";
import { showSuccessAlert } from "src/app/lib/alerts";
import { Service } from "src/app/services/service";
import Swal from "sweetalert2";
import { specialities, users } from "src/app/lib/dummy";
import { CustomValidatorsComponent } from "src/app/custom-validators/custom-validators.component";
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  step: number = 0;
  registerForm: FormGroup;
  submitted = false;
  specialities: string[] = specialities;
  times = [
    {
      day: "Monday",
      morning: { start: "", end: "", isDisabled: false },
      afternoon: { start: "", end: "", isDisabled: false },
    },
    {
      day: "Tuesday",
      morning: { start: "", end: "", isDisabled: false },
      afternoon: { start: "", end: "", isDisabled: false },
    },
    {
      day: "Wednesday",
      morning: { start: "", end: "", isDisabled: false },
      afternoon: { start: "", end: "", isDisabled: false },
    },
    {
      day: "Thursday",
      morning: { start: "", end: "", isDisabled: false },
      afternoon: { start: "", end: "", isDisabled: false },
    },
    {
      day: "Friday",
      morning: { start: "", end: "", isDisabled: false },
      afternoon: { start: "", end: "", isDisabled: false },
    },
    {
      day: "Saturday",
      morning: { start: "", end: "", isDisabled: false },
      afternoon: { start: "", end: "", isDisabled: false },
    },
    {
      day: "Sunday",
      morning: { start: "", end: "", isDisabled: false },
      afternoon: { start: "", end: "", isDisabled: false },
    },
  ];
  constructor(private router: Router , private service:Service , public dialog: MatDialog) {
    this.registerForm = new FormGroup({
      role: new FormControl("", Validators.required),
      firstName: new FormControl("", Validators.required),
      lastName: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
      phone: new FormControl("", Validators.required),
      address: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
      cpassword: new FormControl("", Validators.required),
      // medecin
      medecinPackage: new FormControl(""),
      speciality: new FormControl(""),
      fax: new FormControl(""),
      url: new FormControl(""),
      isChangingTime: new FormControl(""),
    },
    CustomValidatorsComponent.mustMatch('password', 'cpassword')
    );
    
    this.registerForm
      .get("role")
      .valueChanges.subscribe((value) => this.handleRoleChange(value));
    // this.registerForm
    //   .get("isChangingTime")
    //   .valueChanges.subscribe((value) => this.handleIsChangingTime(value));
    // workingTime?: IWorkingTime;
  }

  ngOnInit(): void {}
   //handleIsChangingTime(isChecked: boolean) {
  //  console.log({ isChecked });
 // }
  handleRoleChange(value: string) {
    this.registerForm.controls.medecinPackage.setValidators(
      value === "patient" ? null : [Validators.required]
    );
   
    this.registerForm.controls.speciality.setValidators(
      value === "patient" ? null : [Validators.required]
    );
    
    this.registerForm.controls.medecinPackage.updateValueAndValidity();
    this.registerForm.controls.speciality.updateValueAndValidity();
    this.registerForm.controls.fax.updateValueAndValidity();
  }

  disableTime(event: any, index: number, isMorning: boolean) {
    const isChecked = event.checked;
    console.log({ isChecked, index, isMorning });
    if (isMorning) {
      this.times[index].morning.isDisabled = isChecked;
      if (isChecked) {
        this.times[index].morning.start = "";
        this.times[index].morning.end = "";
      }
    } else {
      this.times[index].afternoon.isDisabled = isChecked;
      if (isChecked) {
        this.times[index].afternoon.start = "";
        this.times[index].afternoon.end = "";
      }
    }
  }

  nextStep() {
    this.step++;
    console.log( this.registerForm.get("role").value);
  }

  previousStep() {
    this.step--;
  }

  get role() {
    return this.registerForm.get("role").value;
  }
  get isChangingTime() {
    return this.registerForm.get("isChangingTime").value;
  }

  get isMedecinPackage(){
    return this.registerForm.get("medecinPackage").value;
  }
  get registerFormControls() {
    return this.registerForm.controls;
  }

  handleSubmit() {
    const data = this.registerForm.value;
    console.log({ data, times: this.times });
    this.submitted = true;
    if (this.registerForm.invalid) {
      return "test";
    }
    if (data.role=='patient'){
      console.log(data.role)
      this.registerPatient(data)
    }
    else{
      console.log("test");
      const dialogRef = this.dialog.open(CheckoutComponent, {
        data: {  data },
       });
        dialogRef.afterClosed().subscribe((result) => {
          if (result) 
          {
            showSuccessAlert("Votre enregistrement est traité avec succés , tu doit attendre la validation de l'administrateur afin d'accéder a votre espace");
            this.router.navigate(['auth/login']);
          }
        
       }
       ); 
    }
    
  }


  
registerPatient(data){

   
  let newPatient = data;
  newPatient.status=1;
  newPatient.id_role=3;

  this.submitted = true;
  if (this.registerForm.invalid) {
    return ;
  }
     this.service.register(newPatient).subscribe(
       (data:any)=>{
  
         if(data.msg==="success"){
  
           Swal.fire("Succès!", "Bienvenue dans notre plateforme", "success");
         
           this.router.navigate(['auth/login']);
  
         
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

