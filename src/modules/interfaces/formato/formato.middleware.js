import { AppError } from '../../../utils/AppError.js';
import { catchAsync } from '../../../utils/catchAsync.js';
import { Formato } from './formato.model.js';

export const validExistFormato = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const formato = await Formato.findOne({
    where: {
      id,
    },
  });

  if (!formato) {
    return next(new AppError(`formato with id: ${id} not found `, 404));
  }

  req.formato = formato;
  next();
});
