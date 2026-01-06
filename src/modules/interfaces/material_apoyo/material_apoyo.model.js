import { DataTypes } from 'sequelize';
import { db } from '../../../database/config.js';

const MaterialApoyo = db.define('material_apoyo', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  interface_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  material_apoyo: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export { MaterialApoyo };
