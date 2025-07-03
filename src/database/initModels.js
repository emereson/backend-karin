import { CambiosFoda } from '../modules/moduloFoda/cambiosFoda/cambiosFoda.model.js';
import { Foda } from '../modules/moduloFoda/foda/foda.model.js';
import { FodaNota } from '../modules/moduloFoda/fodaNota/fodaNota.model.js';

const initModel = () => {
  Foda.hasMany(CambiosFoda, { foreignKey: 'foda_id', as: 'cambiosFoda' });
  CambiosFoda.belongsTo(Foda, { foreignKey: 'foda_id' });
  Foda.hasMany(FodaNota, { foreignKey: 'foda_id', as: 'notas' });
  FodaNota.belongsTo(Foda, { foreignKey: 'foda_id' });
  // Section.hasMany(SectionVideo, { foreignKey: 'sectionId' });
  // SectionVideo.belongsTo(Section, { foreignKey: 'sectionId' });
  // Section.hasMany(PhotoAlbum, { foreignKey: 'sectionId' });
  // PhotoAlbum.belongsTo(Section, { foreignKey: 'sectionId' });
  // Section.hasMany(Gallery, { foreignKey: 'sectionId' });
  // Gallery.belongsTo(Section, { foreignKey: 'sectionId' });
};

export { initModel };
