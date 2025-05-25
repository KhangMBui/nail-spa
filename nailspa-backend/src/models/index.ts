import { sequelize } from "../config/database";
import { DataTypes } from "sequelize";
import ServiceModel from "./service";
import WorkerModel from "./worker";
import AppointmentModel from "./appointment";
import IncomeModel from "./income";

export const Service = ServiceModel(sequelize);
export const Worker = WorkerModel(sequelize);
export const Appointment = AppointmentModel(sequelize);
export const Income = IncomeModel(sequelize);

// Define associations between entities

export const syncDb = async () => {
  await sequelize.sync({ alter: true });
};
