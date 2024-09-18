import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { showConfirmationAlert } from "src/app/lib/alerts";
import { users } from "src/app/lib/dummy";

import { Service } from "src/app/services/service";
import { getFormatedDate } from "src/app/utils/date";
import Swal from "sweetalert2";

@Component({
  selector: "app-appointment-requests",
  templateUrl: "./appointment-requests.component.html",
  styleUrls: ["./appointment-requests.component.css"],
})
export class AppointmentRequestsComponent implements OnInit {
  displayedColumns: string[] = ["name", "email", "start", "end", "action"];
  dataSource: MatTableDataSource<any>;
  appointmentRequests: any[];
  connectedMed = JSON.parse(localStorage.getItem('user')).id
  medecinName = JSON.parse(localStorage.getItem('user')).fullName+ " "+JSON.parse(localStorage.getItem('user')).lastName
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
  
    private service:Service
  ) {
    
  }
  ngOnInit(): void {

    this.getMedAppointmentRequests()
  }


  getMedAppointmentRequests(){

    
    this.service.getAllAppointmentSuggestionByMedecinId(this.connectedMed).subscribe(
      (data: any) => {
        if (data !== undefined) {
        

          let list = []
            data.forEach(element => {
            element.date_debut  = element.date_debut.substring(0, 10) + " "+element.date_debut.substring(11,12) + (Number(element.date_debut.substring(12,13))+2)+element.date_debut.substring(13,19) ;
            element.date_fin =element.date_fin.substring(0, 10) + " "+element.date_fin.substring(11,12) + (Number(element.date_fin.substring(12,13))+2)+element.date_fin.substring(13,19);
            list.push(element)
              
            });
          this.dataSource = new MatTableDataSource(list);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }


  acceptAppointment = (id: number , email:any) => {
    
    showConfirmationAlert(
      "Êtes-vous sûr de vouloir accepter cette demande?",
      () => {
        this.service.accepterAppointment(email ,this.medecinName , id).subscribe(
          (data: any) => {
            if (data.msg === "success") {

              Swal.fire({
                icon: 'success',
                title: ' cet demande a été accepté ',
                showConfirmButton: false,
                timer: 1500
              })
              this.getMedAppointmentRequests() 
            }

          },
          (err) => {

            Swal.fire({
              icon: 'error',
              title: 'essayez une autre fois !',
              showConfirmButton: false,
              timer: 1500
            })
        
            console.log(err);
          }
        );
  
      }
    );
  };
  declineAppointment = (id: number ,email:any) => {
    showConfirmationAlert(
      "Êtes-vous sûr de vouloir refuser cette demande?",
      () => {
        this.service.refuseAppointmentSuggestion(email ,this.medecinName , id).subscribe(
          (data: any) => {
            if (data.msg === "success") {

              Swal.fire({
                icon: 'success',
                title: 'cet demande a été refusé ',
                showConfirmButton: false,
                timer: 1500
              })
              this.getMedAppointmentRequests() 
            }

          },
          (err) => {

            Swal.fire({
              icon: 'error',
              title: 'essayez une autre fois !',
              showConfirmButton: false,
              timer: 1500
            })
        
            console.log(err);
          }
        );
       
      }
    );
  };
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  getPatientName(patientId: number) {
    const { firstName, lastName } = users.find((user) => user.id == patientId);
    return `${firstName} ${lastName}`;
  }
  getPatientEmail(patientId: number) {
    const { email } = users.find((user) => user.id == patientId);
    return email;
  }
  formatDate(date: Date) {
    return getFormatedDate(date);
  }


 
}
