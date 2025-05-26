import { DataTypes, Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }, // store hashed password
    role: DataTypes.STRING, // "owner", "manager", "admin"
  });
  return User;
};
