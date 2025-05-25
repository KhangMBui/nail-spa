import { DataTypes, Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
  const Worker = sequelize.define("Worker", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    role: DataTypes.STRING,
    salary: DataTypes.FLOAT,
  });
  return Worker;
};
