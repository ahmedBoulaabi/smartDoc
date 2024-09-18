import { Component, Input, OnInit } from "@angular/core";
import { IUser } from "src/app/models/user";

@Component({
  selector: "app-doctor-card",
  templateUrl: "./doctor-card.component.html",
  styleUrls: ["./doctor-card.component.css"],
})
export class DoctorCardComponent implements OnInit {
  isConnected= localStorage.getItem('user') ;
 
  @Input() data: any;
  constructor() {}

  ngOnInit(): void {
    console.log({ data: this.data });
  }

  
}
