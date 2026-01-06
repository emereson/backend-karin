import { catchAsync } from '../../../utils/catchAsync.js';
import { FodaNota } from './fodaNota.model.js';

export const findAll = catchAsync(async (req, res, next) => {
  const fodaNotas = await FodaNota.findAll({});

  return res.status(200).json({
    status: 'Success',
    results: fodaNotas.length,
    fodaNotas,
  });
});

export const findOne = catchAsync(async (req, res, next) => {
  const { fodaNota } = req;

  return res.status(200).json({
    status: 'Success',
    fodaNota,
  });
});

export const create = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { nota } = req.body;

  const fodaNota = await FodaNota.create({
    foda_id: id,
    nota,
  });

  res.status(201).json({
    status: 'success',
    message: 'the fodaNota has been created successfully!',
    fodaNota,
  });
});

export const update = catchAsync(async (req, res) => {
  const { fodaNota } = req;
  const { estado, colaboradora, nivel, detalle, caduca, fecha_ingreso } =
    req.body;

  await fodaNota.update({
    estado,
    colaboradora,
    nivel,
    detalle,
    caduca,
    fecha_ingreso,
  });

  return res.status(200).json({
    status: 'success',
    message: 'fodaNota information has been updated',
    fodaNota,
  });
});

export const deleteElement = catchAsync(async (req, res) => {
  const { fodaNota } = req;

  await fodaNota.destroy();

  return res.status(200).json({
    status: 'success',
    message: `The fodaNota with id: ${fodaNota.id} has been deleted`,
  });
});
