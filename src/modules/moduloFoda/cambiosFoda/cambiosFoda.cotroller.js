import FormData from 'form-data';
import { catchAsync } from '../../../utils/catchAsync.js';
import { CambiosFoda, Foda } from './cambiosFoda.model.js';
import axios from 'axios';

export const findAll = catchAsync(async (req, res, next) => {
  const cambiosFoda = await CambiosFoda.findAll({});

  return res.status(200).json({
    status: 'Success',
    results: cambiosFoda.length,
    cambiosFoda,
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

  const foda = await Foda.create({
    estado,
    colaboradora,
    nivel,
    detalle,
    caduca,
    fecha_ingreso,
  });

  res.status(201).json({
    status: 'success',
    message: 'the foda has been created successfully!',
    foda,
  });
});

export const update = catchAsync(async (req, res) => {
  const { foda } = req;
  const { estado, colaboradora, nivel, detalle, caduca, fecha_ingreso } =
    req.body;

  await foda.update({
    estado,
    colaboradora,
    nivel,
    detalle,
    caduca,
    fecha_ingreso,
  });

  return res.status(200).json({
    status: 'success',
    message: 'foda information has been updated',
    foda,
  });
});

export const cargarDocumento = catchAsync(async (req, res, next) => {
  const { foda } = req;

  let file_path = null;
  console.log(req.file);

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

  await foda.update({
    documento: file_path,
    estado: 'pendiente',
  });

  res.status(201).json({
    status: 'success',
    message: 'the materialApoyo has been created successfully!',
    foda,
  });
});

export const deleteElement = catchAsync(async (req, res) => {
  const { foda } = req;

  await foda.destroy();

  return res.status(200).json({
    status: 'success',
    message: `The foda with id: ${foda.id} has been deleted`,
  });
});
