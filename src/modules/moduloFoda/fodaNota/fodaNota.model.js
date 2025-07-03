import { DataTypes } from 'sequelize';
import { db } from '../../../database/config.js';

const FodaNota = db.define('foda_nota', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  foda_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  nota: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export { FodaNota };
