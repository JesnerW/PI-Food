const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe',{
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING, 
      allowNull: false
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    healthScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        min: 0,
        max: 100
      }
    },
    servings: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        min: 1,
        max: 100
      }
    },
    readyInMinutes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        min: 1,
        max: 1440
      }
    },
    image: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    instructions: {
      allowNull: false,
      type: DataTypes.TEXT
    }
  },{timestamps:false, freezeTableName: true});
};
