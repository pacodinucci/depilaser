const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('staff', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    disponibility: {
        type: DataTypes.JSON,
        allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    record: {
      type:DataTypes.JSON,
      allowNull: true
    }
  },
  {sequelize, timestamps: false});
};