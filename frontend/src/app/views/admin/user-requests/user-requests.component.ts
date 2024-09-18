import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { showConfirmationAlert, showSuccessAlert } from "src/app/lib/alerts";
import { user_requests } from "src/app/lib/dummy";
import { IUser } from "src/app/models/user";
import { Service } from "src/app/services/service";
import Swal from "sweetalert2";

@Component({
  selector: "app-user-requests",
  templateUrl: "./user-requests.component.html",
  styleUrls: ["./user-requests.component.css"],
})
export class UserRequestsComponent implements OnInit {
  displayedColumns: string[] = [
    "name",
    "email",
    "phone",
    "type",
    "montant",
    "action",
  ];
  dataSource: MatTableDataSource<any>;
  users: any[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private service:Service) {
 
  }
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


  ngOnInit(): void {this.getAllRequest()}

  getAllRequest(){

    this.service.getAllMedecinRequest().subscribe(
      (data: any) => {
        if (data !== undefined) {
          this.users = data;
          this.dataSource = new MatTableDataSource(this.users);
    
        }
      },
      (err) => {
        console.log(err);
      }
    );

  }

  acceptRequest(requestId: any, email:any) {
    showConfirmationAlert("Vous souhaitez accepter ce medecin?", () => {
    

      this.service.accepterMedecin( email , requestId).subscribe(
        (data:any)=>{
   
          if(data){
   
            Swal.fire("Succès!", "modification avec succès", "success");
            this.getAllRequest()
   
          } 
        },err=>{
          Swal.fire({
            title: 'Erreur!',
            text: 'Vérifier votre informations, essayez une autre fois!',
            icon: 'error',
            confirmButtonText: 'OK'
          })
          
        });
    });
  }
  declineRequest(requestId: any , email:any) {
    showConfirmationAlert("Vous souhaitez refuser ce medecin?", () => {
    

      this.service.refuserMedecin( email , requestId).subscribe(
        (data:any)=>{
   
          if(data){
   
            Swal.fire("Succès!", "modification avec succès", "success");
            this.getAllRequest()
  
          } 
        },err=>{
          Swal.fire({
            title: 'Erreur!',
            text: 'Vérifier votre informations, essayez une autre fois!',
            icon: 'error',
            confirmButtonText: 'OK'
          })
          
        });
    });
  }
}
