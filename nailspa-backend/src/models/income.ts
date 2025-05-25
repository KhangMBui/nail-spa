import { DataTypes, Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
  const Income = sequelize.define("Income", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    amount: DataTypes.FLOAT,
    date: DataTypes.DATE,
    source: DataTypes.STRING, // e.g. "service", "product", etc.
    appointmentId: DataTypes.INTEGER, // FK to Appointment (optional)
    notes: DataTypes.STRING,
  });
  return Income;
};
