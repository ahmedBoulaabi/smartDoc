import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { showConfirmationAlert, showSuccessAlert } from "src/app/lib/alerts";
import { users } from "src/app/lib/dummy";
import { IUser } from "src/app/models/user";
import { Service } from "src/app/services/service";

@Component({
  selector: "app-users",
  templateUrl: "./my-patients.component.html",
  styleUrls: ["./my-patients.component.css"],
})
export class MyPatientsComponent implements OnInit {
  displayedColumns: string[] = ["name", "email", "phone", "address"];
  connectedId= JSON.parse(localStorage.getItem('user')).id

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

  ngOnInit(): void {

    this.getAllPatientByMedecinId()
  }


  

  getAllPatientByMedecinId(){

    this.service.getAllPatientByMedecinId(this.connectedId).subscribe(
      (data: any) => {
        if (data !== undefined) {
          this.users = data
          this.dataSource = new MatTableDataSource(this.users);
       
    

        }
      },
      (err) => {
        console.log(err);
      }
    );

  }
}
