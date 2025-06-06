import { DataTypes, Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
  const Income = sequelize.define("Income", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    subTotal: {
      type: DataTypes.FLOAT, // sum of services/products
      allowNull: false,
    },
    tip: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    }, // subtotal + tip
    tipForOwner: {
      type: DataTypes.FLOAT,
      allowNull: true,
    }, // portion of tip for owner
    tipForWorker: {
      type: DataTypes.FLOAT,
      allowNull: true,
    }, // portion of tip for worker
    date: {
      type: DataTypes.DATE,
    },
    source: {
      type: DataTypes.STRING,
      allowNull: false,
    }, // e.g. "service", "product", "both", etc.
    appointmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }, // FK to Appointment (optional)
    notes: {
      type: DataTypes.STRING,
    },
  });
  return Income;
};
