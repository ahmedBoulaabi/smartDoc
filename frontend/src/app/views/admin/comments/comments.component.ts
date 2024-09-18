import { Component, OnInit, ViewChild } from "@angular/core";
import { IComment } from "src/app/models/comments";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { comments } from "src/app/lib/dummy";
import { showConfirmationAlert, showSuccessAlert } from "src/app/lib/alerts";



@Component({
  selector: "app-comments",
  templateUrl: "./comments.component.html",
  styleUrls: ["./comments.component.css"],
})
export class CommentsComponent implements OnInit {
  displayedColumns: string[] = ["email", "date", "comment", "action"];
  dataSource: MatTableDataSource<IComment>;
  comments: IComment[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
    this.comments = comments;
    this.dataSource = new MatTableDataSource(comments);
  }
  ngOnInit(): void {}
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
  acceptComment(commentId: any) {
    showConfirmationAlert("Vous souhaitez accepter ce commentaire?", () => {
      const newComments = this.comments.filter((user) => user.id != commentId);
      this.comments = newComments;
      this.dataSource = new MatTableDataSource(newComments);
      showSuccessAlert("Ce commentaire a été accepté");
    });
  }
  declineComment(commentId: any) {
    showConfirmationAlert("Vous souhaitez refuser ce commentaire?", () => {
      const newComments = this.comments.filter((user) => user.id != commentId);
      this.comments = newComments;
      this.dataSource = new MatTableDataSource(newComments);
      showSuccessAlert("Ce commentaire a été refusé");
    });
  }




}
