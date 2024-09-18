import { Injectable } from "@angular/core";
import { users } from "../lib/dummy";
import { getLocalUser, isLoggedIn, login, logout } from "../lib/storage";
import { ILocalUser, IUser } from "../models/user";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor() {}

  login(userData: ILocalUser) {
    login(userData);
  }
  logout() {
    logout();
  }
  getConnectedUser() {
    const localData: ILocalUser = getLocalUser();
    if (!localData) return;
    const { email } = localData;
    const user: IUser = users.find((user) => user.email === email);
    return user;
  }
  getIsMedecin() {
    const localData: ILocalUser = getLocalUser();
    if (!localData) return false;
    return localData.role === "medecin" ? true : false;
  }
  getIsAdmin() {
    const localData: ILocalUser = getLocalUser();
    if (!localData) return false;
    return localData.role === "admin" ? true : false;
  }
  getIsConnected() {
    const isAuth: boolean = isLoggedIn();
    return isAuth;
  }
}
