import { ILocalUser } from "../models/user";

export const login = (userData: ILocalUser) => {
  window.localStorage.setItem("user", JSON.stringify(userData));
};
export const logout = () => {
  window.localStorage.removeItem("user");
  window.location.reload();
};

export const isLoggedIn = () => {
  const storage = window.localStorage.getItem("user");
  if (!storage) return false;
  let user: ILocalUser;
  user = JSON.parse(storage);
  return user.email != "";
};
export const isAdmin = () => {
  const storage = window.localStorage.getItem("user");
  if (!storage) return false;
  let user: ILocalUser;
  user = JSON.parse(storage);
  return user.role === "admin";
};
export const isMedecin = () => {
  const storage = window.localStorage.getItem("user");
  if (!storage) return false;
  let user: ILocalUser;
  user = JSON.parse(storage);
  return user.role === "medecin";
};

export const getRole = () => {
  const storage = window.localStorage.getItem("user");
  if (!storage) return "";
  let user: ILocalUser;
  user = JSON.parse(storage);
  return user.role;
};
export const getLocalUser = () => {
  const storage = window.localStorage.getItem("user");
  if (!storage) return;
  let user: ILocalUser = JSON.parse(storage);
  return user;
};
