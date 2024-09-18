import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { showConfirmationAlert, showSuccessAlert } from "src/app/lib/alerts";
import { users } from "src/app/lib/dummy";
import { IUser } from "src/app/models/user";
import { Service } from "src/app/services/service";
import Swal from "sweetalert2";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = [
    "name",
    "medType",
    "address",
    "email",
    "phone",
    "action",
  ];

  dataSource: MatTableDataSource<IUser>;
  users: IUser[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service:Service) {
  
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

  ngOnInit(): void {this.getAllMedecins()}

  getAllMedecins(){

    this.service.getAllMedecin().subscribe(
      (data: any) => {
        if (data !== undefined) {
          this.users = data;
          this.dataSource = new MatTableDataSource( this.users);
    
        }
      },
      (err) => {
        console.log(err);
      }
    );

  }

  removeUser(requestId: any) {
 

    showConfirmationAlert("Vous souhaitez supprimer cet utilisateur?", () => {
    

      this.service.deleteMedecin( requestId).subscribe(
        (data:any)=>{
   
          if(data){
   
            Swal.fire("Succès!", "suppression avec succès", "success");
            this.getAllMedecins()
   
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
