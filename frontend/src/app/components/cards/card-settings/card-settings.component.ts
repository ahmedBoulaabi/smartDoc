import { ThrowStmt } from "@angular/compiler";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { OwlOptions } from "ngx-owl-carousel-o";
import { doctor_gallery } from "src/app/lib/dummy";
import { IUser } from "src/app/models/user";
import { AuthService } from "src/app/services/auth.service";
import { Service } from "src/app/services/service";
import { specialities } from "src/app/lib/dummy";
import Swal from "sweetalert2";
@Component({
  selector: "app-card-settings",
  templateUrl: "./card-settings.component.html",
  styleUrls: ["./card-settings.component.css"],
})
export class CardSettingsComponent implements OnInit {
  specialities: string[] = specialities;
  isForConnectedUser: boolean = false; //either this card is for the connected user or for another
  userId;
  userData: any;
  typeProfile : any
  images = [...doctor_gallery];
  files = [];
  role:any
  infoForm: FormGroup;
  connectedId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).id : null
  connectedRole = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).id_role : null
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    margin: 30,
    navSpeed: 700,
    autoWidth: true,
    navText: [
      "<i class='fa fa-chevron-left'></i>",
      "<i class='fa fa-chevron-right'></i>",
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1.2,
      },
      740: {
        items: 2.3,
      },
      940: {
        items: 3.2,
      },
    },
    nav: true,
  };
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
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private service:Service
  ) {


    this.infoForm = new FormGroup({
      firstName: new FormControl("", Validators.required),
      lastName: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
      phone: new FormControl("", Validators.required),
      address: new FormControl("", Validators.required),
      medecinPackage: new FormControl(""),
      gender: new FormControl(""),
      speciality: new FormControl(""),
      fax: new FormControl(""),
      url: new FormControl(""),
      isChangingTime: new FormControl(""),
      images: new FormControl(""),
    });

    this.activatedRoute.params.subscribe(async (params) => {
      this.userId = params["id"];
      if (this.userId){
        this.getUserDataById();
      
      }else{
        this.userId =this.connectedId
        this.getUserDataById();
      }
    
      
      
    });
  }

  ngOnInit(): void {}


  getUserById(id:any){

    this.service.getUserById(id).subscribe(
      (data: any) => {
        if (data !== undefined) {
        
       
          this.role = data.id_role
          this.typeProfile= data.medecinPackage 
          this.intiForm(data);
        }
      },
      (err) => {
        console.log(err);
      }
    );

  }


  getUserDataById() {
      this.getUserById(this.userId)
  }
  
  intiForm(data:any) {


       this.infoForm.patchValue({
        firstName: data.firstName,
        lastName : data.lastName,
        email :data.email,
        phone : data.phone,
        address:data.address,
        speciality:data.speciality,
        fax:data.fax,
        url: data.url,
  

          });
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

  get isChangingTime() {
    return this.infoForm.get("isChangingTime").value;
  }

  onFileChange(event: any) {
    const { files } = event.target;
    const self = this;
    for (var i = 0; i < files.length; i++) {
      this.files.push(files[i]);
      (function (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (_event) => {
          self.images.unshift({ path: reader.result });
        };
      })(files[i]);
    }
  }

  get isMedecin() {
    return this.userData.role === "medecin";
  }

  get isEditDisabled() {
    return this.isForConnectedUser ? true : null;
  }


  handleSubmit() {
    
    
    let user = this.infoForm.getRawValue();

    user.id= this.connectedId


  this.service.editMedecin(user).subscribe(

    (data: any) => {

      if (data.msg === "success") {

     
          Swal.fire({
            icon: "success",
            title: "modifié avec succès!",
            showConfirmButton: false,
            timer: 1500
            });
       
            this.getUserDataById();
       
      
    
      } else {
        Swal.fire({
          title: "Erreur",
          text: "modification échoué!",
          icon: "error",
          confirmButtonText: "OK"
        });
      }
    },
    err => {
      console.log('errr'+err)
      Swal.fire({
        title: "Erreur!",
        text: "Registre échoué!",
        icon: "error",
        confirmButtonText: "OK"
      });
     
    }
  );
  }

}
