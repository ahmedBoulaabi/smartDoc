import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { Service } from "src/app/services/service";

@Component({
  selector: "app-comment-box",
  templateUrl: "./comments-box.component.html",
  styleUrls: ["./comments-box.component.css"],
})
export class CommentsBoxComponent implements OnInit {
  @Input() doctorId ;
  isConnected= localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).id_role : null ;
  comments: any[];
  formComment: FormGroup;
  constructor(private service:Service) {

    alert ("doc"+this.doctorId)
    
    this.getDoctorComments();
    this.formComment = new FormGroup({
      comment: new FormControl("", [Validators.required]),
    });
  }




  getDoctorComments(){



    this.service.getAllMedecinComments(this.doctorId).subscribe(
      (data: any) => {
        if (data !== undefined) {
          this.comments = data;

     
    
        }
      },
      (err) => {
        console.log(err);
      }
    );

  }
  ngOnInit(): void {}

 
  getUserByEmail() {}
}
