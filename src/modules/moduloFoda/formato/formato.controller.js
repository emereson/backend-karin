import axios from 'axios';
import { catchAsync } from '../../../utils/catchAsync.js';
import FormData from 'form-data';
import { Formato } from './formato.model.js';

export const findAll = catchAsync(async (req, res, next) => {
  const formato = await Formato.findOne({
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
  let file_path = null;

  if (req.file) {
    const file = req.file;
    const formDataImg = new FormData();
    formDataImg.append('image', file.buffer, {
      filename: file.originalname,
    });

    const responseImg = await axios.post(
      `${process.env.SERVER_IMAGE}/image`,
      formDataImg,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    file_path = responseImg.data.imagePath;
  }

  const formato = await Formato.create({
    formato_url: file_path,
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
