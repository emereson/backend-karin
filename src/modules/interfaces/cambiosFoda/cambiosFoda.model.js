import { DataTypes } from 'sequelize';
import { db } from '../../../database/config.js';

const CambiosFoda = db.define('cambios_foda', {
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

  revisor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  comentario: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'sin comentario',
  },

  estado: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export { CambiosFoda };
