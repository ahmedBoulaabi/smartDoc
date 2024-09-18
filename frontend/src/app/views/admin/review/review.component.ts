import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { showConfirmationAlert, showSuccessAlert } from "src/app/lib/alerts";
import { reviews } from "src/app/lib/dummy";
import { IReview } from "src/app/models/review";
import { Service } from "src/app/services/service";

import * as FileSaver from "file-saver";
import Swal from "sweetalert2";

@Component({
  selector: "app-review",
  templateUrl: "./review.component.html",
  styleUrls: ["./review.component.css"],
})
export class ReviewComponent implements OnInit {
  displayedColumns: string[] = ["email", "date", "message","medecin", "preuve",  "action"];
  dataSource: MatTableDataSource<IReview>;
  reviews: IReview[];
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

  ngOnInit(): void {this.getAllCommentsEnAttente()}

  getAllCommentsEnAttente(){

    this.service.getAllCommentsEnAttente().subscribe(
      (data: any) => {
        if (data !== undefined) {
          this.reviews = data;
          this.dataSource = new MatTableDataSource(this.reviews );
    
        }
      },
      (err) => {
        console.log(err);
      }
    );

  }

  acceptComment(commentId: any) {
    showConfirmationAlert("Vous souhaitez accepter ce commentaire?", () => {

    
    

      this.service.accepterComment(commentId).subscribe(
        (data:any)=>{
   
          if(data){
   
            showSuccessAlert("Ce commentaire a été accepté");
            this.getAllCommentsEnAttente()
   
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
  declineComment(commentId: any) {
    showConfirmationAlert("Vous souhaitez refuser ce commentaire?", () => {

      this.service.deleteComment(commentId).subscribe(
        (data:any)=>{
   
          if(data){
   
            showSuccessAlert("Ce commentaire a été refusé");
            this.getAllCommentsEnAttente()
   
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

  
  
  download(id , preuve){

   let name = id+preuve.substring(preuve.indexOf('.')) ;
    this.service.getPreuve(name).subscribe((resultBlob: Blob) => {
    
  
      FileSaver.saveAs(resultBlob,  name);
    
    }, err => {
      
      console.log(err)
    }
    );
  }

}
