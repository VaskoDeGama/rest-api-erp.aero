const { DataTypes } = require("sequelize");
const database = require("../utils/database");

const User = database.define("User", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  password: {
    type: DataTypes.STRING,
  },
});
module.exports = User;
