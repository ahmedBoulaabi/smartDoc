import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import DataSource from "devextreme/data/data_source";
import { ScheduleService } from "src/app/services/schedule.service";
import notify from "devextreme/ui/notify";
import { showSuccessAlert } from "src/app/lib/alerts";
import { users } from "src/app/lib/dummy";
import { IUser } from "src/app/models/user";
import { AuthService } from "src/app/services/auth.service";
import { Service } from "src/app/services/service";

@Component({
  selector: "app-booking-card",
  templateUrl: "./booking-card.component.html",
  styleUrls: ["./booking-card.component.css"],
})
export class BookingCardComponent implements OnInit {
  isAppointmentAdded: boolean = false;
  connectedId = JSON.parse(localStorage.getItem('user')).id
  doctorId: number;
  docData: any;
  profilePicSrc:any
  isConnected: boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private scheduleService: ScheduleService,
    private authService: AuthService,
    private service:Service
  ) {
    this.isConnected = this.authService.getIsConnected();

  

    this.activatedRoute.params.subscribe(async (params) => {
      this.doctorId = params["id"];
    this.getUserById(this.doctorId)
    this.getAllAppointmentByMedId()
    });
  }

  ngOnInit(): void {}

  dataSource: DataSource;

  currentDate: Date = new Date();

  views = ["week"];

  currentView = this.views[0];


  
  getAllAppointmentByMedId() {
    this.service.getAllAppointmentByMedecinId(this.doctorId).subscribe(
      (data: any) => {
        if (data !== undefined) {
          let list = []
          data.forEach(element => {
            list.push ({

              id:element.id,
              
    

              patientId: element.id_patient,
              patientFistName : element.firstName,
              patientLastName : element.lastName,
              medId: this.doctorId,
              startDate :element.date_debut  ,  //new Date("2022-04-26T08:00:00.000Z"),
              endDate:element.date_fin  ,
              



            })
          });

          this.dataSource = new DataSource({
            store: list,
          });
        
       
        }
      },
      (err) => {
        console.log(err);
      })
  }



  onAppointmentFormOpening(e: any) {
    let startDate = e.appointmentData.startDate;
    if (!this.isConnected) {
      e.cancel = true;
      this.notifyConnect();
    }
    if (!this.isValidAppointmentDate(startDate)) {
      e.cancel = true;
      this.notifyDisableDate();
    }

    let form = e.form;
    form.option("items", [
      {
        dataField: "startDate",
        editorType: "dxDateBox",
        editorOptions: {
          width: "100%",
          type: "datetime",
          readOnly: true,
        },
      },
      {
        name: "endDate",
        dataField: "endDate",
        editorType: "dxDateBox",
        editorOptions: {
          width: "100%",
          type: "datetime",
          readOnly: true,
        },
      },
      {
        label: {
          text: "vous voulez vraiment confirmer ce rendez-vous?",
        },
        editorOptions: {
          width: "100%",
        },
      },
    ]);

    // this.applyDisableDatesToDateEditors(e.form);
  }

  onAppointmentAdding(e: any) {
    const isValidAppointment = this.isValidAppointment(
      e.component,
      e.appointmentData
    );
    if (!isValidAppointment) {
      e.cancel = true;
      this.notifyDisableDate();
    }
    this.isAppointmentAdded = true;
    const data = e.appointmentData;

    let endDateCalcul = new Date(data.endDate)
    endDateCalcul.setHours(endDateCalcul.getHours()+2)

    let startDateCalcul = new Date(data.startDate)
    startDateCalcul.setHours(startDateCalcul.getHours()+2)

    
    let newAppointment = {
   
      date_debut:startDateCalcul,
      date_fin: endDateCalcul,
      id_medecin: this.doctorId,
      id_patient: this.connectedId, 
    }

    
 
  
    this.service.ajouterAppointement(newAppointment).subscribe(
      (data:any)=>{
 
        if(data.msg==="success"){
 
          showSuccessAlert("demande de rendez-vous ajouté avec succés! vous allez recevoir un email pour vouz informez de l'etat de traitement de votre demande")
        
        } 
      })
      


  }

  onAppointmentUpdating(e: any) {
    const isValidAppointment = this.isValidAppointment(e.component, e.newData);
    if (!isValidAppointment) {
      e.cancel = true;
      this.notifyDisableDate();
    }
  }

  notifyDisableDate() {
    notify(
      "Cannot create or move an appointment/event to disabled time/date regions.",
      "warning",
      1000
    );
  }
  notifyConnect() {
    notify("You should connect first", "warning", 1000);
  }

  isReserved(date: Date) {
    return this.scheduleService.isReserved(date);
  }

  isValidAppointment(component: any, appointmentData: any) {
    const startDate = new Date(appointmentData.startDate);
    const endDate = new Date(appointmentData.endDate);
    const cellDuration = component.option("cellDuration");
    return this.isValidAppointmentInterval(startDate, endDate, cellDuration);
  }

  isValidAppointmentInterval(
    startDate: Date,
    endDate: Date,
    cellDuration: number
  ) {
    const edgeEndDate = new Date(endDate.getTime() - 1);

    if (!this.isValidAppointmentDate(edgeEndDate)) {
      return false;
    }

    const durationInMs = cellDuration * 60 * 1000;
    const date = startDate;
    while (date <= endDate) {
      if (!this.isValidAppointmentDate(date)) {
        return false;
      }
      const newDateTime = date.getTime() + durationInMs - 1;
      date.setTime(newDateTime);
    }

    return true;
  }

  isValidAppointmentDate(date: Date) {
    return !this.isReserved(date);
    // return (
    //   !this.isHoliday(date) && !this.isDinner(date) && !this.isWeekend(date) && !this.isReserved(date)
    // );
  }

  // applyDisableDatesToDateEditors(form: any) {
  //   const holidays = this.scheduleService.getHolidays();
  //   const startDateEditor = form.getEditor("startDate");
  //   startDateEditor.option("disabledDates", holidays);

  //   const endDateEditor = form.getEditor("endDate");
  //   endDateEditor.option("disabledDates", holidays);
  // }
  proceedToPay() {
    showSuccessAlert("Réservation effectuée avec succès");
  }

  getPatientNameById(patientId) {
    const { firstName, lastName } = users.find((user) => user.id == patientId);
    return `${firstName} ${lastName}`;
  }




  getUserById(id:any){

    this.service.getUserById(id).subscribe(
      (data: any) => {
        if (data !== undefined) {

          this.docData = data ;
        
          
        if (this.docData.medecinPackage === "basic")
          this.profilePicSrc = "assets/img/doctors/doctor_default_male.jpg";
          else 
          
          
       this.profilePicSrc =   this.docData.imageMedecin ? "http://localhost:3008/api/getImage?name="+this.docData.id+this.docData.imageMedecin.substring(this.docData.imageMedecin.indexOf('.')) : "assets/img/doctors/doctor_default_male.jpg";
        

        }
      },
      (err) => {
        console.log(err);
      }
    );

  }
}

