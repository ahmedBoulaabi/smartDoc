import { BrowserModule } from "@angular/platform-browser";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

// layouts
import { AdminComponent } from "./layouts/admin/admin.component";
import { AuthComponent } from "./layouts/auth/auth.component";

// admin views
import { DashboardComponent } from "./views/admin/dashboard/dashboard.component";
import { MapsComponent } from "./views/admin/maps/maps.component";
import { SettingsComponent } from "./views/admin/settings/settings.component";
import { TablesComponent } from "./views/admin/tables/tables.component";

// auth views
import { LoginComponent } from "./views/auth/login/login.component";
import { RegisterComponent } from "./views/auth/register/register.component";

// no layouts views
import { LandingComponent } from "./views/landing/landing.component";
import { ProfileComponent } from "./views/profile/profile.component";

// components for views and layouts

import { AdminNavbarComponent } from "./components/navbars/admin-navbar/admin-navbar.component";
import { AuthNavbarComponent } from "./components/navbars/auth-navbar/auth-navbar.component";
import { CardBarChartComponent } from "./components/cards/card-bar-chart/card-bar-chart.component";
import { CardLineChartComponent } from "./components/cards/card-line-chart/card-line-chart.component";
import { CardPageVisitsComponent } from "./components/cards/card-page-visits/card-page-visits.component";
import { CardProfileComponent } from "./components/cards/card-profile/card-profile.component";
import { CardSettingsComponent } from "./components/cards/card-settings/card-settings.component";
import { CardSocialTrafficComponent } from "./components/cards/card-social-traffic/card-social-traffic.component";
import { CardStatsComponent } from "./components/cards/card-stats/card-stats.component";
import { CardTableComponent } from "./components/cards/card-table/card-table.component";
import { FooterAdminComponent } from "./components/footers/footer-admin/footer-admin.component";
import { FooterComponent } from "./components/footers/footer/footer.component";
import { FooterSmallComponent } from "./components/footers/footer-small/footer-small.component";
import { HeaderStatsComponent } from "./components/headers/header-stats/header-stats.component";
import { IndexNavbarComponent } from "./components/navbars/index-navbar/index-navbar.component";
import { MapExampleComponent } from "./components/maps/map-example/map-example.component";
import { IndexDropdownComponent } from "./components/dropdowns/index-dropdown/index-dropdown.component";
import { TableDropdownComponent } from "./components/dropdowns/table-dropdown/table-dropdown.component";
import { PagesDropdownComponent } from "./components/dropdowns/pages-dropdown/pages-dropdown.component";
import { NotificationDropdownComponent } from "./components/dropdowns/notification-dropdown/notification-dropdown.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { UserDropdownComponent } from "./components/dropdowns/user-dropdown/user-dropdown.component";
import { TestComponent } from "./views/test/test.component";
import { MapComponent } from "./views/map/map.component";
import { DoctorCardComponent } from "./components/doctor-card/doctor-card.component";
import { BookingCardComponent } from "./components/booking-card/booking-card.component";
import { CheckoutComponent } from "./components/checkout/checkout.component";
// import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatStepperModule } from "@angular/material/stepper";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatFormFieldModule } from "@angular/material/form-field";
import { CommonModule } from "@angular/common";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { ProfileDoctorComponent } from "./views/profile-doctor/profile-doctor.component";
import { SearchDoctorComponent } from "./views/search-doctor/search-doctor.component";
import { IvyGalleryModule } from "angular-gallery";
import { BookingComponent } from "./views/booking/booking.component";
// import { IvyCarouselModule } from "angular-responsive-carousel";
import { SlickCarouselModule } from "ngx-slick-carousel";
import { CarouselModule } from "ngx-owl-carousel-o";
import { CommentsComponent } from "./views/admin/comments/comments.component";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { DoctorsComponent } from "./views/admin/doctors/doctors.component";
import { UsersComponent } from "./views/admin/users/users.component";
import {PatientsComponent} from './views/admin/patients/patients.component'
import { UserRequestsComponent } from "./views/admin/user-requests/user-requests.component";
import { DisqusModule } from "ngx-disqus";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DxSchedulerModule } from "devextreme-angular";
import { ScheduleService } from "./services/schedule.service";
import { ReviewComponent } from "./views/admin/review/review.component";
import { MedCommentsComponent } from "./views/medecin/med-comments/med-comments.component";
import { MyPatientsComponent } from "./views/medecin/my-patients/my-patients.component";
import { MySchedulesComponent } from "./views/medecin/my-schedules/my-schedules.component";
import { AppointmentRequestsComponent } from "./views/medecin/appointment-requests/appointment-requests.component";
import { MatDialogModule } from "@angular/material/dialog";
import { RateModalComponent } from "./components/modals/rate-modal/rate-modal.component";
import { NgxStarRatingModule } from "ngx-star-rating";
import { CommentsBoxComponent } from './components/comments-box/comments-box.component';
import { CommentComponent } from './components/comment/comment.component';
import { HttpClientModule } from "@angular/common/http";
import { ReclamationsComponent } from "./views/admin/reclamations/reclamations.component";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CardBarChartComponent,
    CardLineChartComponent,
    IndexDropdownComponent,
    PagesDropdownComponent,
    TableDropdownComponent,
    NotificationDropdownComponent,
    UserDropdownComponent,
    SidebarComponent,
    FooterComponent,
    FooterSmallComponent,
    FooterAdminComponent,
    CardPageVisitsComponent,
    CardProfileComponent,
    CardSettingsComponent,
    CardSocialTrafficComponent,
    CardStatsComponent,
    CardTableComponent,
    HeaderStatsComponent,
    MapExampleComponent,
    AuthNavbarComponent,
    AdminNavbarComponent,
    IndexNavbarComponent,
    AdminComponent,
    AuthComponent,
    MapsComponent,
    SettingsComponent,
    TablesComponent,
    LoginComponent,
    RegisterComponent,
    LandingComponent,
    ProfileComponent,
    TestComponent,
    MapComponent,
    DoctorCardComponent,
    BookingCardComponent,
    CheckoutComponent,
    ProfileDoctorComponent,
    SearchDoctorComponent,
    BookingComponent,
    CommentsComponent,
    DoctorsComponent,
    UsersComponent,
    UserRequestsComponent,
    ReviewComponent,
    MedCommentsComponent,
    MyPatientsComponent,
    MySchedulesComponent,
    AppointmentRequestsComponent,
    RateModalComponent,
    CommentsBoxComponent,
    CommentComponent,
    ReclamationsComponent,
    PatientsComponent
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // ReactiveFormsModule,
    BrowserAnimationsModule,
    // MatStepperModule,
    MatFormFieldModule,
    MatButtonToggleModule,
    MatInputModule,
    BrowserModule,
    AppRoutingModule,
    MatSelectModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    IvyGalleryModule,
    // IvyCarouselModule,
    SlickCarouselModule,
    CarouselModule,
    MatTableModule,
    MatPaginatorModule,
    DisqusModule.forRoot("disqus_shortname"),
    DxSchedulerModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    NgxStarRatingModule,
    HttpClientModule
  ],
  providers: [ScheduleService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
