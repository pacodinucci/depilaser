const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('horarios', {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    dia: {
        type: DataTypes.STRING,
        allowNull: false
    },
    hora: {
        type: DataTypes.STRING,
        allowNull: false
    }
  },
  {sequelize, timestamps: false});
};