import { DataTypes, Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
  const Worker = sequelize.define("Worker", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    role: DataTypes.STRING,
    salary: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    passcode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    turn: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  });
  return Worker;
};
