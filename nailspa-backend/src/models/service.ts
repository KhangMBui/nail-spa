import { DataTypes, Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
  const Service = sequelize.define("Service", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    turn: { type: DataTypes.FLOAT, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    gel: DataTypes.BOOLEAN,
  });
  return Service;
};
