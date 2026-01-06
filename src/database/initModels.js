import { CambiosFoda } from '../modules/interfaces/cambiosFoda/cambiosFoda.model.js';
import { Foda } from '../modules/interfaces/foda/foda.model.js';
import { FodaNota } from '../modules/interfaces/fodaNota/fodaNota.model.js';

const initModel = () => {
  Foda.hasMany(CambiosFoda, { foreignKey: 'foda_id', as: 'cambiosFoda' });
  CambiosFoda.belongsTo(Foda, { foreignKey: 'foda_id' });
  Foda.hasMany(FodaNota, { foreignKey: 'foda_id', as: 'notas' });
  FodaNota.belongsTo(Foda, { foreignKey: 'foda_id' });
};

export { initModel };
