import { AppError } from '../../../utils/AppError.js';
import { catchAsync } from '../../../utils/catchAsync.js';
import { MaterialApoyo } from './material_apoyo.model.js';

export const validExistMaterialApoyo = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const materialApoyo = await MaterialApoyo.findOne({
    where: {
      id,
    },
  });

  if (!materialApoyo) {
    return next(new AppError(`materialApoyo with id: ${id} not found `, 404));
  }

  req.materialApoyo = materialApoyo;
  next();
});
