import { AppError } from '../../../utils/AppError.js';
import { catchAsync } from '../../../utils/catchAsync.js';
import { CambiosFoda } from '../cambiosFoda/cambiosFoda.model.js';
import { FodaNota } from '../fodaNota/fodaNota.model.js';
import { Foda } from './foda.model.js';

export const validExistFoda = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const foda = await Foda.findOne({
    where: {
      id,
    },
    include: [
      { model: CambiosFoda, as: 'cambiosFoda' },
      { model: FodaNota, as: 'notas' },
    ],
  });

  if (!foda) {
    return next(new AppError(`foda with id: ${id} not found `, 404));
  }

  req.foda = foda;
  next();
});
