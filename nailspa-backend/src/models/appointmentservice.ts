import { DataTypes, Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
  const AppointmentService = sequelize.define("AppointmentService", {
    appointmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    serviceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return AppointmentService;
};
