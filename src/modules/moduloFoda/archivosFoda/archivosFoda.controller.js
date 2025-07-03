import axios from 'axios';
import { catchAsync } from '../../../utils/catchAsync.js';
import FormData from 'form-data';
import { ArchivosFoda } from './archivosFoda.model.js';

export const findAll = catchAsync(async (req, res, next) => {
  const archivosFoda = await ArchivosFoda.findAll({});

  return res.status(200).json({
    status: 'Success',
    results: archivosFoda.length,
    archivosFoda,
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
  const { estado, colaboradora, nivel, detalle, caduca, fecha_ingreso } =
    req.body;
  let documento_foda_path = null;

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

    documento_foda_path = responseImg.data.imagePath;
  }

  const archivoFoda = await ArchivosFoda.create({
    estado,
    colaboradora,
    nivel,
    detalle,
    caduca,
    fecha_ingreso,
    documento_foda: documento_foda_path,
  });

  res.status(201).json({
    status: 'success',
    message: 'the archivoFoda has been created successfully!',
    archivoFoda,
  });
});

export const update = catchAsync(async (req, res) => {
  const { archivoFoda } = req;

  await archivoFoda.update();

  return res.status(200).json({
    status: 'success',
    message: 'archivoFoda information has been updated',
    archivoFoda,
  });
});

export const deleteElement = catchAsync(async (req, res) => {
  const { archivoFoda } = req;

  await archivoFoda.destroy();

  return res.status(200).json({
    status: 'success',
    message: `The archivoFoda with id: ${archivoFoda.id} has been deleted`,
  });
});
