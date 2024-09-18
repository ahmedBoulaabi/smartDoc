import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";

import { Service } from "src/app/services/service";
import Swal from "sweetalert2";


@Component({
  selector: "app-reclamations",
  templateUrl: "./reclamations.component.html",
  styleUrls: ["./reclamations.component.scss"],
})
export class ReclamationsComponent implements OnInit {
  displayedColumns: string[] = ["email", "date", "message", "action"];
  dataSource: MatTableDataSource<any>;
  reclamations: any[];
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

    this.getAllReclamation()
  }


  

  getAllReclamation(){

    this.service.getAllReclamation().subscribe(
      (data: any) => {
        if (data !== undefined) {
          this.reclamations = data;
          this.dataSource = new MatTableDataSource(this.reclamations);
       
    

        }
      },
      (err) => {
        console.log(err);
      }
    );

  }

   
  archiverReclamation(id: any) {

    
    Swal.fire({
      text: "Êtes-vous sûr de vouloir archiver cette reclamation?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.archiverReclamation(id).subscribe(
          (data: any) => {
            if (data.msg === "success") {

              Swal.fire({
                icon: 'success',
                title: 'Demande archivé!',
                showConfirmButton: false,
                timer: 1500
              })
              this.getAllReclamation() 
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
    });
  }


}
