import { Component, OnInit, ViewChild } from "@angular/core";
import { IComment } from "src/app/models/comments";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { comments } from "src/app/lib/dummy";
import { showConfirmationAlert, showSuccessAlert } from "src/app/lib/alerts";
import { getLocalUser } from "src/app/lib/storage";
import { AuthService } from "src/app/services/auth.service";
import { Service } from "src/app/services/service";
import Swal from "sweetalert2";

@Component({
  selector: "app-med-comments",
  templateUrl: "./med-comments.component.html",
  styleUrls: ["./med-comments.component.css"],
})
export class MedCommentsComponent implements OnInit {
  displayedColumns: string[] = ["email", "date", "comment", "action"];
  connectedMed = JSON.parse(localStorage.getItem('user')).id
  dataSource: MatTableDataSource<any>;
  comments: any[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service:Service) {
  
  }
  ngOnInit(): void {this.getMedComments()}

  getMedComments(){

    this.service.getAllMedecinComments(this.connectedMed).subscribe(
      (data: any) => {
        if (data !== undefined) {
          this.comments = data;
          this.dataSource = new MatTableDataSource(this.comments );
    
        }
      },
      (err) => {
        console.log(err);
      }
    );

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


  repondre(id){

    Swal.fire({
      title: 'Repondre à ce commentaire',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'confirmer',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {



        this.service.repondreComment(id ,  login).subscribe(
          (data: any) => {
            if (data !== undefined) {
             
              showSuccessAlert("Cette reponse enregistré avec succés");
              this.getMedComments()
        
            }
          },
          (err) => {
            console.log(err);
          }
        );
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
       
      }
    })

    

  }

 
}
