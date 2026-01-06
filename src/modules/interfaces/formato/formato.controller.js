import axios from 'axios';
import { catchAsync } from '../../../utils/catchAsync.js';
import FormData from 'form-data';
import { Formato } from './formato.model.js';
import { uploadImage } from '../../../utils/serverImage.js';

export const findAll = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const formato = await Formato.findOne({
    where: { interface_id: id },
    order: [['createdAt', 'DESC']],
  });

  if (!formato) {
    return res.status(404).json({
      status: 'fail',
      message: 'No se encontró ningún FOrmato',
    });
  }

  return res.status(200).json({
    status: 'success',
    formato,
  });
});

export const findOne = catchAsync(async (req, res, next) => {
  const { banner } = req;

  return res.status(200).json({
    status: 'Success',
    banner,
  });
});

export const create = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  let file_path = null;

  if (req.file) {
    const file = req.file;
    file_path = await uploadImage(file);
  }

  const formato = await Formato.create({
    formato_url: file_path,
    interface_id: id,
  });

  res.status(201).json({
    status: 'success',
    message: 'the formato has been created successfully!',
    formato,
  });
});

export const update = catchAsync(async (req, res) => {
  const { formato } = req;

  await formato.update();

  return res.status(200).json({
    status: 'success',
    message: 'formato information has been updated',
    formato,
  });
});

export const deleteElement = catchAsync(async (req, res) => {
  const { formato } = req;

  await formato.destroy();

  return res.status(200).json({
    status: 'success',
    message: `The formato with id: ${formato.id} has been deleted`,
  });
});
