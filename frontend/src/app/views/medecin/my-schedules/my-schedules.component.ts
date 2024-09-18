import { Component, OnInit } from "@angular/core";
import DataSource from "devextreme/data/data_source";

import { users } from "src/app/lib/dummy";
import { AuthService } from "src/app/services/auth.service";
import { ScheduleService } from "src/app/services/schedule.service";
import { Service } from "src/app/services/service";
import { getConvertedDate } from "src/app/utils/date";

@Component({
  selector: "app-my-schedules",
  templateUrl: "./my-schedules.component.html",
  styleUrls: ["./my-schedules.component.css"],
})
export class MySchedulesComponent implements OnInit {
  dataSource: DataSource;
  views = ["week"];
  connectedMed = JSON.parse(localStorage.getItem('user')).id
  currentDate: Date = new Date();
  currentView = this.views[0];
  constructor(
    private scheduleService: ScheduleService,
    private authService: AuthService,
    private service:Service
  ) {
    
    this.getAllAppointmentByMedId()

    
  }

  onAppointmentFormOpening(e: any) {
    let startDate = e.appointmentData.startDate;
    const patientName = e.appointmentData.patientFistName + " "+e.appointmentData.patientLastName;
    let form = e.form;
    form.option("items", [
      {
        label: {
          text: "Patient",
        },
        name: "patient",
        editorType: "dxTextBox",
        editorOptions: {
          value: patientName,
          readOnly: true,
        },
      },
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
    ]);

    // this.applyDisableDatesToDateEditors(e.form);
  }
  ngOnInit(): void {}

  getPatientNameById(patientId) {
    const { firstName, lastName } = users.find((user) => user.id == patientId);
    return `${firstName} ${lastName}`;
  }

  getFormattedDate(date: Date) {
    return getConvertedDate(date);
  }


  getAllAppointmentByMedId() {
    this.service.getAllAppointmentByMedecinId(this.connectedMed).subscribe(
      (data: any) => {
        if (data !== undefined) {
          let list = []
          data.forEach(element => {
            list.push ({

              id:element.id,
              
    

              patientId: element.id_patient,
              patientFistName : element.firstName,
              patientLastName : element.lastName,
              medId: this.connectedMed,
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
}
