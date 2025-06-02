import { DataTypes, Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
  const WorkerArrival = sequelize.define(
    "WorkerArrival",
    {
      workerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      arrivalDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      arrivalOrder: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  return WorkerArrival;
};
