import { DataTypes, Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: DataTypes.STRING, // store hashed password
    role: DataTypes.STRING, // "owner", "manager", "admin"
  });
  return User;
};
