import { Component, OnInit } from "@angular/core";
import { MapService } from "src/app/services/map.service";
import { Gallery } from "angular-gallery";
import { doctor_gallery, users } from "../../lib/dummy";
import { OwlOptions } from "ngx-owl-carousel-o";
import { MatDialog } from "@angular/material/dialog";
import { RateModalComponent } from "src/app/components/modals/rate-modal/rate-modal.component";
import { ActivatedRoute } from "@angular/router";
import { IUser } from "src/app/models/user";
import { AuthService } from "src/app/services/auth.service";
import { Service } from "src/app/services/service";

@Component({
  selector: "app-profile-doctor",
  templateUrl: "./profile-doctor.component.html",
  styleUrls: ["./profile-doctor.component.css"],
})
export class ProfileDoctorComponent implements OnInit {
  doctorId;
  docData: IUser;
  isConnected= localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).id_role :  null;
  profilePicSrc:any ; 
  profileTpe:any
  images = [...doctor_gallery];
  url = "http://localhost:4401";
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

  slideConfig = { slidesToShow: 4, slidesToScroll: 2 };

  constructor(
    private map: MapService,
    private gallery: Gallery,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private service:Service
  ) {
  
  
    this.getDocInfo();
  }

  ngOnInit(): void {
    this.map.getDoctorMap();
  }
  getDocInfo() {
    this.activatedRoute.params.subscribe(async (params) => {
      this.doctorId = params["id"];
     
      this.getUserById(this.doctorId)
     
    });
  }


  getUserById(id:any){

    this.service.getUserById(id).subscribe(
      (data: any) => {
        if (data !== undefined) {
        
          this.docData = data ;
          this.profileTpe = data.medecinPackage
      
          
        if (data.medecinPackage === "basic")
          this.profilePicSrc = "assets/img/doctors/doctor_default_male.jpg";
          else 
          
        this.profilePicSrc =   data.imageMedecin ? "http://localhost:3008/api/getImage?name="+data.id+data.imageMedecin.substring(data.imageMedecin.indexOf('.')) : "assets/img/doctors/doctor_default_male.jpg";
        

        }
      },
      (err) => {
        console.log(err);
      }
    );

  
}
  showGallery(index: number) {
    let prop = {
      images: [...doctor_gallery],
      index,
    };
    this.gallery.load(prop);
  }
  breakpoint(e) {
    console.log("breakpoint");
  }

  afterChange(e) {
    console.log("afterChange");
  }

  beforeChange(e) {
    console.log("beforeChange");
  }

  // comments
  onComment(event: any) {
    console.log({ onCOmment: event });
  }
  onReady(event: any) {
    console.log({ onReady: event });
  }
  onPaginate(event: any) {
    console.log({ onPaginate: event });
  }

  openRateDialog() {
    this.dialog.open(RateModalComponent, {
      data: {
        medId: this.doctorId,
      },
    });
  }
}
