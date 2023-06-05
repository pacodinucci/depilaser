const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('turnos', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    treat: {
        type: DataTypes.STRING,
        allowNull: false 
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    hour: {
        type: DataTypes.TIME,
        allowNull: false
    },
    day: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM("Disponible","Ocupado","Suspendido"),
        allowNull: false,
        defaultValue: "Disponible"
    }
  },
  {sequelize, timestamps: false});
};
