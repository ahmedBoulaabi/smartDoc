import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { users } from "src/app/lib/dummy";
import { login } from "src/app/lib/storage";
import { ILocalUser } from "src/app/models/user";
import { AuthService } from "src/app/services/auth.service";
import { Service } from "src/app/services/service";
import Swal from "sweetalert2";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginError: string = "";
  loginForm: FormGroup;
  constructor(private router: Router,   private service: Service) {
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required]),
    });
  }

  ngOnInit(): void {}

  login() {


    let donnees = this.loginForm.getRawValue();
    this.service.signin(donnees).subscribe(

      (data: any) => {
  
        if (data.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Bienvenue!",
            showConfirmButton: false,
            timer: 1500
          });
  
          let user = data.member
    
            localStorage.setItem("user", JSON.stringify(data.member))

            if (user.role === "admin")
              return this.router.navigateByUrl("/admin/doctor-requests");
            if (user.role === "medecin")
              return this.router.navigateByUrl("/medecin/profile");
            else this.router.navigateByUrl("/");
         
       
        } else {
          Swal.fire({
            title: "Erreur",
            text: "Verifier votre login et password!",
            icon: "error",
            confirmButtonText: "OK"
          });
        }
      },
      err => {
        console.log('errr'+err)
        Swal.fire({
          title: "Erreur!",
          text: "Verifier votre login et password!",
          icon: "error",
          confirmButtonText: "OK"
        });
       
      }
    );
  
  }

}
