import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { specialities, users } from "src/app/lib/dummy";
import { IUser } from "src/app/models/user";
import { MapService } from "src/app/services/map.service";
import { Service } from "src/app/services/service";

@Component({
  selector: "app-search-doctor",
  templateUrl: "./search-doctor.component.html",
  styleUrls: ["./search-doctor.component.css"],
})
export class SearchDoctorComponent implements OnInit {
  specialities: string[] = specialities;
  searchForm: FormGroup;
  doctors: IUser[];
  filteredDoctors: IUser[];
  constructor(private map: MapService , private service:Service) {
    this.searchForm = new FormGroup({
      speciality: new FormControl("", [Validators.required]),
      searchWord: new FormControl("", [Validators.required]),
    });
    this.getAllDocs();
    this.handleSearchListner();
  }


  

  
  getAllDocs(){


    this.service.getAllMedecin().subscribe(
      (data: any) => {
        if (data !== undefined) {
          let newList =[]


          data.forEach(element => {
            element.profilePic = element.imageMedecin ? "http://localhost:3008/api/getImage?name="+element.id+element.imageMedecin.substring(element.imageMedecin.indexOf('.')) : "assets/img/doctors/doctor_default_male.jpg";
        
            newList.push(element)
          });

          this.doctors = newList
          this.filteredDoctors = [...this.doctors];
        }
      },
      (err) => {
        console.log(err);
      });

  }


  
  ngOnInit() {
    // this.map.buildMap();
  }
  handleSearchListner() {
    this.searchForm.valueChanges.subscribe(({ searchWord, speciality }) => {
      this.filteredDoctors = this.doctors
        .filter((doctor) =>
          doctor.speciality.toLowerCase().includes(speciality.toLowerCase())
        )
        .filter(({ firstName, lastName, phone, fax, address }) => {
          const word = searchWord.toLowerCase();
          if (
            `${firstName} ${lastName}`.toLowerCase().includes(word) ||
            `${lastName} ${firstName}`.toLowerCase().includes(word) ||
            `${phone}`.includes(word) ||
            `${fax}`.includes(word) ||
            address.toLowerCase().includes(word)
          )
            return true;
          return false;
        });
    });
  }
  handleSearch() {
    const searchInput = this.searchForm.get("searchWord").value;
    console.log({ searchInput });
  }
}
