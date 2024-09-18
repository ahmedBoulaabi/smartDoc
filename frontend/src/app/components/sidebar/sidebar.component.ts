import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
})
export class SidebarComponent implements OnInit {
  collapseShow = "hidden";
  routes: IRoute[] = [];
  adminRoutes: IRoute[] = [
  


    { path: "/admin/users", title: "Medecins", icon: "fas fa-table" },
    { path: "/admin/patients", title: "Patients", icon: "fas fa-table" },
    {
      path: "/admin/doctor-requests",
      title: "Demandes d'inscription",
      icon: "fas fa-table",
    },
    { path: "/admin/reviews", title: "Avis", icon: "fas fa-table" },
    { path: "/admin/reclamations", title: "Reclamations", icon: "fas fa-table" },
  ];
  medecinRoutes: IRoute[] = [
    { path: "/medecin/profile", title: "Profile", icon: "fas fa-tools" },
    {
      path: "/medecin/comments",
      title: "Commentaires",
      icon: "fas fa-comments",
    },
    {
      path: "/medecin/my-patients",
      title: "Mes patients",
      icon: "fas fa-hospital-user",
    },
    {
      path: "/medecin/my-schedule",
      title: "Mes rendez-vous",
      icon: "fas fa-calendar-alt",
    },
    {
      path: "/medecin/appointment-requests",
      title: "Demandes de rendez-vous",
      icon: "fas fa-calendar-check",
    },
  ];
  constructor(private authService: AuthService, private router: Router) {
    const isAdmin = this.authService.getIsAdmin();
    const isMedecin = this.authService.getIsMedecin();
    if (isAdmin) this.routes = this.adminRoutes;
    if (isMedecin) this.routes = this.medecinRoutes;
  }

  ngOnInit() {}
  toggleCollapseShow(classes) {
    this.collapseShow = classes;
  }

  isActiveRoute(route: string) {
    const currentRoute = this.router.url;
    return currentRoute.includes(route);
  }
}

interface IRoute {
  path: string;
  title: string;
  icon: string;
}
