import { Appointment } from "../types/index";

let appointments: Appointment[] = [];

export const AppointmentModel = {
  getAll: (): Appointment[] => appointments,
  getById: (id: string): Appointment | undefined =>
    appointments.find((a) => a.id === id),
  add: (appointment: Appointment): Appointment => {
    appointments.push(appointment);
    return appointment;
  },
  update: (
    id: string,
    updates: Partial<Appointment>
  ): Appointment | undefined => {
    const appointment = appointments.find((a) => a.id === id);
    if (appointment) {
      Object.assign(appointment, updates);
      return appointment;
    }
    return undefined;
  },
  remove: (id: string): boolean => {
    const index = appointments.findIndex((a) => a.id === id);
    if (index !== -1) {
      appointments.splice(index, 1);
      return true;
    }
    return false;
  },
};
