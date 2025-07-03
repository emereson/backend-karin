import { DataTypes } from 'sequelize';
import { db } from '../../../database/config.js';

const Formato = db.define('formato', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },

  formato_url: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export { Formato };
