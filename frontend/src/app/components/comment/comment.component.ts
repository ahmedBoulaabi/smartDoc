import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { showSuccessAlert } from "src/app/lib/alerts";
import { users } from "src/app/lib/dummy";
import { IComment } from "src/app/models/comments";
import { IUser } from "src/app/models/user";
import { AuthService } from "src/app/services/auth.service";
import { Service } from "src/app/services/service";
import Swal from "sweetalert2";

@Component({
  selector: "app-comment",
  templateUrl: "./comment.component.html",
  styleUrls: ["./comment.component.css"],
})
export class CommentComponent implements OnInit {
  isConnected= localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).id_role : null ;
  idConnected =localStorage.getItem('user') ?  JSON.parse(localStorage.getItem('user')).id : null;
  @Input() doctorId;
  comments:any
  isAllowedToReply: boolean = false; //only the doc owner of that profile is allowed to reply
  doctorData: any;
  formComment: FormGroup;
  isShowReply: boolean = false;
  preuve:any;
  constructor(private authService: AuthService , private service:Service  ) {
  //  this.isConnected = authService.getIsConnected();

  
    this.formComment = new FormGroup({
      commentaire: new FormControl("", [Validators.required]),
      preuve: new FormControl("", [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getDoctorData();
    this.getDoctorComments()
  }

  
  getDoctorData() {
    this.service.getUserById(this.doctorId).subscribe(
      (data: any) => {
        if (data !== undefined) {
        
            this.doctorData=data
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  handleSubmit(event) {
    event.preventDefault();
    const reply = this.formComment.value.reply;
    console.log({ reply });
    showSuccessAlert("commentaire Ajouter");
  }
  toggleReplyBox() {
    this.isShowReply = !this.isShowReply;
  }
  getIsAllowedToReply() {
    const connectedId = this.authService.getConnectedUser()?.id;
    this.isAllowedToReply = connectedId == this.doctorId;
  }


  public get progressBanneer(): any {
    const banner = this.formComment.get("preuve").value;
    if (!banner) return;
    return { value: 100, fileName: banner };
  }


  selectBanner(event) {
    const file = event.target.files[0];
    this.preuve = file;
    this.formComment.patchValue({ preuve: file.name });
   
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




  
  uploadPreuve = ( name) => {

    let formData = new FormData();
   formData.append("file",  this.preuve);

        this.service.uploadPreuve(formData,name).subscribe(
        (data: any) => {

        Swal.fire({
        icon: "success",
        title: "enregistrer avec succès!",
        showConfirmButton: false,
        timer: 1500
        });
     this.formComment.reset()

        },
        (err) => {
        console.log ("err")
        }
);

};



  onSubmit() {
    alert (JSON.stringify({...this.formComment.value}))
 let data = {...this.formComment.value}
 data.id_patient = this.idConnected ;
 data.id_medecin=this.doctorId;
  
 
   

  this.service.ajouterComment(data).subscribe(

    (data: any) => {

      if (data.msg === "success") {
    
        this.uploadPreuve(data.commentId+this.preuve.name.substring(this.preuve.name.indexOf('.')))
    
      } else {
        Swal.fire({
          title: "Erreur",
          text: "Registre échoué!",
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
