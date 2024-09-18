import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { users } from "src/app/lib/dummy";
import { IUser } from "src/app/models/user";
import { AuthService } from "src/app/services/auth.service";
import { Service } from "src/app/services/service";
import Swal from "sweetalert2";

@Component({
  selector: "app-card-profile",
  templateUrl: "./card-profile.component.html",
  styleUrls: ["./card-profile.component.css"],
})
export class CardProfileComponent implements OnInit {
  isForConnectedUser: boolean = false;
  userId;
  userData: any;
  profilePicSrc: any;
  connectedId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).id : null
  typeProfile= localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).medecinPackage : null
  connectedRole = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).id_role : null
  profilePicFile;
  id : any;
  type_profile : any
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private service:Service
  ) {
    this.activatedRoute.params.subscribe(async (params) => {
      this.userId = params["id"];
      if (this.userId){
        this.getUserDataById();
      }else{
        this.userId=this.connectedId
        this.getUserDataById();
      }
     
        
     
     
    });
  }
  getUserDataById() {

    this.getUserById(this.userId)
   
  }


  ngOnInit(): void {}

  get isMedecin() {
    return this.userData.role === "medecin";
  }

  uploadFile(event: any) {
    const file = (event.target as HTMLInputElement).files[0];
    if (!file) return;
    this.profilePicFile = file;
    const reader = new FileReader();
    reader.onload = (e) => (this.profilePicSrc = reader.result);
    reader.readAsDataURL(this.profilePicFile);
    this.editImage(file.name)
  }


  
  editImage(name) {
    
    

  this.service.updateImageMedecin(this.connectedId ,  name).subscribe(

    (data: any) => {

      if (data.msg === "success") {

     
            this.uploadImage(name);
       
      
    
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

  
  uploadImage = ( name) => {


    let imgName = this.connectedId+name.substring(name.indexOf('.'))
    let formData = new FormData();
   formData.append("file",  this.profilePicFile);

        this.service.uploadImageMedecin(formData,imgName).subscribe(
        (data: any) => {

        Swal.fire({
        icon: "success",
        title: "Image modifié avec succès!",
        showConfirmButton: false,
        timer: 1500
        });
        this.getUserDataById()
        },
        (err) => {
        console.log ("err")
        }
        );

        };

  getUserById(id:any){

    this.service.getUserById(id).subscribe(
      (data: any) => {
        if (data !== undefined) {


          if (data.id === this.connectedId){
            localStorage.setItem('user' , JSON.stringify(data))
          }

    
        
          this.userData = data ;
          this.id = data.id
          
        if (this.userData.medecinPackage === "basic")
          this.profilePicSrc = "assets/img/doctors/doctor_default_male.jpg";
          else 
          
          
this.profilePicSrc =   this.userData.imageMedecin ? "http://localhost:3008/api/getImage?name="+this.userData.id+this.userData.imageMedecin.substring(this.userData.imageMedecin.indexOf('.')) : "assets/img/doctors/doctor_default_male.jpg";
        

        }
      },
      (err) => {
        console.log(err);
      }
    );

  }
}
