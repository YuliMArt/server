const { DataTypes } = require("sequelize");
const db = require("../../database/conexion");

const Agente = db.define("agentes", {
  id_agent: {
    type: DataTypes.UUID,
    primaryKey: true,
    unique: true,
  },
  id_rol: {
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  online: {
    type: DataTypes.BOOLEAN,
  },
  last_time: {
    type: DataTypes.STRING,
  },
  foto: {
    type: DataTypes.STRING,
  },
  converttl: {
    type: DataTypes.INTEGER,
  },
  estado: {
    type: DataTypes.BOOLEAN
  }
});
Agente.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());

  delete values.password;
  return values;
};
module.exports = Agente;
