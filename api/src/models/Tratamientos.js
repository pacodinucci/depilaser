const { DataTypes } = require('sequelize');
const moment = require('moment');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('tratamientos', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    disponibility: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: []
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    record: {
      type:DataTypes.JSONB,
      allowNull: true
    }
  },
  {sequelize, timestamps: false});
};
