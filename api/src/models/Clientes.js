const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('clientes', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    record: {
        type: DataTypes.JSONB,
        allowNull: true
    },
    status:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
  },
  {sequelize, timestamps: false});
};
