import { AppError } from '../../../utils/AppError.js';
import { catchAsync } from '../../../utils/catchAsync.js';
import { FodaNota } from './fodaNota.model.js';

export const validExistFoda = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const fodaNota = await FodaNota.findOne({
    where: {
      id,
    },
  });

  if (!fodaNota) {
    return next(new AppError(`fodaNota with id: ${id} not found `, 404));
  }

  req.fodaNota = fodaNota;
  next();
});
