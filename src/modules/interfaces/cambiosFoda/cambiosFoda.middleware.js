import { AppError } from '../../../utils/AppError.js';
import { catchAsync } from '../../../utils/catchAsync.js';
import { Foda } from './cambiosFoda.model.js';

export const validExistFoda = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const foda = await Foda.findOne({
    where: {
      id,
    },
  });

  if (!foda) {
    return next(new AppError(`foda with id: ${id} not found `, 404));
  }

  req.foda = foda;
  next();
});
