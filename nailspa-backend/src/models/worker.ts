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
  });
  return Worker;
};
