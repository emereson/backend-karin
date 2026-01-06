import { DataTypes } from 'sequelize';
import { db } from '../../../database/config.js';

const ArchivosFoda = db.define('archivos_foda', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  colaboradora: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  documento_foda_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
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

export { ArchivosFoda };
