import FormData from 'form-data';
import { catchAsync } from '../../../utils/catchAsync.js';
import { Foda } from './foda.model.js';
import axios from 'axios';
import { CambiosFoda } from '../cambiosFoda/cambiosFoda.model.js';
import { FodaNota } from '../fodaNota/fodaNota.model.js';

export const findAll = catchAsync(async (req, res, next) => {
  const fodas = await Foda.findAll({
    include: [
      { model: CambiosFoda, as: 'cambiosFoda' },
      { model: FodaNota, as: 'notas' },
    ],
  });

  return res.status(200).json({
    status: 'Success',
    results: fodas.length,
    fodas,
  });
});

export const findOne = catchAsync(async (req, res, next) => {
  const { foda } = req;

  return res.status(200).json({
    status: 'Success',
    foda,
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

  await CambiosFoda.create({
    foda_id: foda.id,
    revisor: 'Lisset Carrillo',
    comentario: 'publicado a travez del gestor documental',
    estado: 'pendiente',
  });

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

export const validarDocumento = catchAsync(async (req, res, next) => {
  const { foda } = req;
  const { comentario } = req.body;

  await CambiosFoda.create({
    foda_id: foda.id,
    revisor: 'Lisset Carrillo',
    comentario,
    estado: 'validado',
  });

  await foda.update({
    estado: 'validado',
  });

  res.status(201).json({
    status: 'success',
    message: 'the materialApoyo has been created successfully!',
    foda,
  });
});

export const rechazarDocumento = catchAsync(async (req, res, next) => {
  const { foda } = req;
  const { comentario } = req.body;

  await CambiosFoda.create({
    foda_id: foda.id,
    revisor: 'Lisset Carrillo',
    comentario,
    estado: 'rechazado',
  });

  await foda.update({
    estado: 'rechazado',
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
