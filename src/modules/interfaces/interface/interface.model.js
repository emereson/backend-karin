import { DataTypes } from 'sequelize';
import { db } from '../../../database/config.js';

const InterfaceDocs = db.define('interface_docs', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  nombre_interface: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipos_documento: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
});

export { InterfaceDocs };
