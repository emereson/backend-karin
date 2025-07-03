import axios from 'axios';
import { catchAsync } from '../../../utils/catchAsync.js';
import FormData from 'form-data';
import { MaterialApoyo } from './material_apoyo.model.js';

export const findAll = catchAsync(async (req, res, next) => {
  const materialApoyo = await MaterialApoyo.findOne({
    order: [['createdAt', 'DESC']],
  });

  if (!materialApoyo) {
    return res.status(404).json({
      status: 'fail',
      message: 'No se encontró ningún materialApoyo',
    });
  }

  return res.status(200).json({
    status: 'success',
    materialApoyo,
  });
});

export const findOne = catchAsync(async (req, res, next) => {
  const { materialApoyo } = req;

  return res.status(200).json({
    status: 'Success',
    materialApoyo,
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
    console.log(responseImg.data);

    file_path = responseImg.data.imagePath;
  }

  const materialApoyo = await MaterialApoyo.create({
    material_apoyo: file_path,
  });

  res.status(201).json({
    status: 'success',
    message: 'the materialApoyo has been created successfully!',
    materialApoyo,
  });
});

export const update = catchAsync(async (req, res) => {
  const { materialApoyo } = req;

  await materialApoyo.update();

  return res.status(200).json({
    status: 'success',
    message: 'materialApoyo information has been updated',
    materialApoyo,
  });
});

export const deleteElement = catchAsync(async (req, res) => {
  const { materialApoyo } = req;

  await materialApoyo.destroy();

  return res.status(200).json({
    status: 'success',
    message: `The materialApoyo with id: ${materialApoyo.id} has been deleted`,
  });
});
