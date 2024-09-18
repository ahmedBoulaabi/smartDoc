import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminGuard } from "./guard/admin.guard";
import { AuthGuard } from "./guard/auth.guard";

// layouts
import { AdminComponent } from "./layouts/admin/admin.component";
import { AuthComponent } from "./layouts/auth/auth.component";
import { CommentsComponent } from "./views/admin/comments/comments.component";

// admin views
import { DashboardComponent } from "./views/admin/dashboard/dashboard.component";
import { MapsComponent } from "./views/admin/maps/maps.component";
import { PatientsComponent } from "./views/admin/patients/patients.component";
import { ReclamationsComponent } from "./views/admin/reclamations/reclamations.component";
import { ReviewComponent } from "./views/admin/review/review.component";
import { SettingsComponent } from "./views/admin/settings/settings.component";
import { TablesComponent } from "./views/admin/tables/tables.component";
import { UserRequestsComponent } from "./views/admin/user-requests/user-requests.component";
import { UsersComponent } from "./views/admin/users/users.component";

// auth views
import { LoginComponent } from "./views/auth/login/login.component";
import { RegisterComponent } from "./views/auth/register/register.component";
import { BookingComponent } from "./views/booking/booking.component";

// no layouts views
import { LandingComponent } from "./views/landing/landing.component";
import { MapComponent } from "./views/map/map.component";
import { AppointmentRequestsComponent } from "./views/medecin/appointment-requests/appointment-requests.component";
import { MedCommentsComponent } from "./views/medecin/med-comments/med-comments.component";
import { MyPatientsComponent } from "./views/medecin/my-patients/my-patients.component";
import { MySchedulesComponent } from "./views/medecin/my-schedules/my-schedules.component";
import { ProfileDoctorComponent } from "./views/profile-doctor/profile-doctor.component";
import { ProfileComponent } from "./views/profile/profile.component";
import { SearchDoctorComponent } from "./views/search-doctor/search-doctor.component";

const routes: Routes = [
  { path: "", component: LandingComponent },
  // admin views
  {
    path: "admin",
    component: AdminComponent,
    children: [
    
  
      { path: "tables", component: TablesComponent },
      { path: "comments", component: CommentsComponent },
      { path: "reclamations", component: ReclamationsComponent },
      { path: "reviews", component: ReviewComponent },
      { path: "users", component: UsersComponent },
      { path: "patients", component: PatientsComponent },
      { path: "users/:id", component: SettingsComponent },
      { path: "doctor-requests", component: UserRequestsComponent },
      { path: "maps", component: MapsComponent },
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
    ],
    canActivate: [AdminGuard],
  },
  {
    path: "medecin",
    component: AdminComponent,
    children: [
  
      { path: "profile", component: SettingsComponent },
      { path: "tables", component: TablesComponent },
      { path: "comments", component: MedCommentsComponent },
      { path: "my-patients", component: MyPatientsComponent },
      { path: "my-patients/:id", component: SettingsComponent },
      { path: "my-schedule", component: MySchedulesComponent },
      { path: "appointment-requests", component: AppointmentRequestsComponent },
      { path: "users", component: UsersComponent },
      { path: "doctor-requests", component: UserRequestsComponent },
      { path: "maps", component: MapsComponent },
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
    ],
    canActivate: [AuthGuard],
  },
  // auth views
  {
    path: "auth",
    component: AuthComponent,
    children: [
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      { path: "", redirectTo: "login", pathMatch: "full" },
    ],
  },
  // no layout views
  // { path: "profile", component: ProfileComponent },
  { path: "profile/:id", component: ProfileDoctorComponent },
  { path: "booking/:id", component: BookingComponent },
  { path: "search", component: SearchDoctorComponent },

  { path: "map", component: MapComponent },
  { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
