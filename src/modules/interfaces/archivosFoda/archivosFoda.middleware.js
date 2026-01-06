import { AppError } from '../../../utils/AppError.js';
import { catchAsync } from '../../../utils/catchAsync.js';
import { ArchivosFoda } from './archivosFoda.model.js';

export const validExistArchivoFoda = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const archivoFoda = await ArchivosFoda.findOne({
    where: {
      id,
    },
  });

  if (!archivoFoda) {
    return next(new AppError(`archivoFoda with id: ${id} not found `, 404));
  }

  req.archivoFoda = archivoFoda;
  next();
});
