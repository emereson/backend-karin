import { AppError } from '../../../utils/AppError.js';
import { catchAsync } from '../../../utils/catchAsync.js';
import { InterfaceDocs } from './interface.model.js';

export const validExistInterfaceDocs = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const interface_doc = await InterfaceDocs.findOne({
    where: {
      id,
    },
  });

  if (!interface_doc) {
    return next(new AppError(`interface_doc with id: ${id} not found `, 404));
  }

  req.interface_doc = interface_doc;
  next();
});
