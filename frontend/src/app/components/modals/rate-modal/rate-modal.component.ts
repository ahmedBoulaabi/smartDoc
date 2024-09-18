import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { showSuccessAlert } from "src/app/lib/alerts";

@Component({
  selector: "app-rate-modal",
  templateUrl: "./rate-modal.component.html",
  styleUrls: ["./rate-modal.component.css"],
})
export class RateModalComponent implements OnInit {
  ratingForm: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: IModalData) {
    this.ratingForm = new FormGroup({
      rate: new FormControl("", [Validators.required]),
    });
  }

  ngOnInit(): void {}
  handleSubmit(event) {
    event.preventDefault();
    console.log({ data: this.ratingForm.value });
    showSuccessAlert(
      `Merci pour votre évaluation ${this.ratingForm.value.rate}`
    );
  }
}

interface IModalData {
  medId: number;
}
