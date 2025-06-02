import { DataTypes, Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
  const Appointment = sequelize.define("Appointment", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    customerName: DataTypes.STRING,
    customerPhone: DataTypes.STRING,
    date: DataTypes.DATE,
    // serviceId: DataTypes.INTEGER, // FK to Service
    workerId: DataTypes.INTEGER, // FK to Worker
    notes: DataTypes.STRING,
    status: DataTypes.STRING, // e.g. "scheduled", "completed", "cancelled"
  });
  return Appointment;
};
