import { Injectable } from "@angular/core";
import { appointmentRequests, appointments } from "../lib/dummy";

@Injectable()
export class ScheduleService {
  getData() {
    return appointments;
  }

  getDinnerTime() {
    return { from: 12, to: 13 };
  }

  getHolidays() {
    return [new Date(2021, 3, 29), new Date(2021, 5, 6)];
  }

  isReserved(date) {
    return appointments.some(
      (element) => date >= element.startDate && date < element.endDate
    );
  }

  getMedAppointments(medId: number) {
    return appointments.filter((appointment) => appointment.medId == medId);
  }
  getMedAppointmentRequests(medId: number) {
    return appointmentRequests.filter(
      (appointment) => appointment.medId == medId
    );
  }
}
