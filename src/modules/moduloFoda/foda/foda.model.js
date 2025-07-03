import { DataTypes } from 'sequelize';
import { db } from '../../../database/config.js';

const Foda = db.define('foda', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'sin documento',
  },

  colaboradora: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  documento: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'sin documento',
  },

  nivel: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  detalle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  caduca: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha_ingreso: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export { Foda };
