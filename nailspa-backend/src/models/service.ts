import { DataTypes, Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
  const Service = sequelize.define("Service", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
  });
  return Service;
};
