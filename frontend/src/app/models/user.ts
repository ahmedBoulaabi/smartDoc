export interface ILocalUser {
  email: string;
  role: string;
}

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  address: string;
  role: "admin" | "medecin" | "patient";

  password?: string;
  //for medecin only
  gender?: string;
  speciality?: string;
  fax?: number;
  url?: string;
  medecinPackage?: "basic" | "gold" | "platin";
  workingTime?: IWorkingTime;
}

export interface IWorkingTime {
  0: { morning: { from: Date; to: Date }; evening: { from: Date; to: Date } };
  1: { morning: { from: Date; to: Date }; evening: { from: Date; to: Date } };
  2: { morning: { from: Date; to: Date }; evening: { from: Date; to: Date } };
  3: { morning: { from: Date; to: Date }; evening: { from: Date; to: Date } };
  4: { morning: { from: Date; to: Date }; evening: { from: Date; to: Date } };
  5: { morning: { from: Date; to: Date }; evening: { from: Date; to: Date } };
  6: { morning: { from: Date; to: Date }; evening: { from: Date; to: Date } };
}
