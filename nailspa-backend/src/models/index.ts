import { sequelize } from "../config/database";
import { DataTypes } from "sequelize";
import ServiceModel from "./service";
import WorkerModel from "./worker";
import AppointmentModel from "./appointment";
import IncomeModel from "./income";
import UserModel from "./user";
import WorkerArrivalModel from "./workerarrival";
import AppointmentServiceModel from "./appointmentservice";

export const Service = ServiceModel(sequelize);
export const Worker = WorkerModel(sequelize);
export const Appointment = AppointmentModel(sequelize);
export const Income = IncomeModel(sequelize);
export const User = UserModel(sequelize);
export const WorkerArrival = WorkerArrivalModel(sequelize);
export const AppointmentService = AppointmentServiceModel(sequelize);

Appointment.belongsToMany(Service, {
  through: AppointmentService,
  foreignKey: "appointmentId",
});
Service.belongsToMany(Appointment, {
  through: AppointmentService,
  foreignKey: "serviceId",
});

// Define associations between entities
export const syncDb = async () => {
  await sequelize.sync({ alter: true });
};
