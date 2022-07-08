const { DataTypes } = require("sequelize");
const db = require("../../database/conexion");

const Rol = db.define("roles", {
  id_rol: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  rol: {
    type: DataTypes.STRING,
  },
  permisos: {
    type: DataTypes.STRING,
  },
});
module.exports = Rol;
