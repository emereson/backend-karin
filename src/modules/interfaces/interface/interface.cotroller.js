import { catchAsync } from '../../../utils/catchAsync.js';
import { InterfaceDocs } from './interface.model.js';

export const findAll = catchAsync(async (req, res, next) => {
  const interfaces = await InterfaceDocs.findAll({});

  return res.status(200).json({
    status: 'Success',
    results: interfaces.length,
    interfaces,
  });
});

export const findOne = catchAsync(async (req, res, next) => {
  const { interface_doc } = req;

  return res.status(200).json({
    status: 'Success',
    interface_doc,
  });
});

export const create = catchAsync(async (req, res, next) => {
  const { nombre_interface, tipos_documento } = req.body;

  const interface_doc = await InterfaceDocs.create({
    nombre_interface,
    tipos_documento,
  });

  res.status(201).json({
    status: 'success',
    message: 'the interface_doc has been created successfully!',
    interface_doc,
  });
});

export const update = catchAsync(async (req, res) => {
  const { interface_doc } = req;
  const { nombre_interface, tipos_documento } = req.body;

  await interface_doc.update({
    nombre_interface,
    tipos_documento,
  });

  return res.status(200).json({
    status: 'success',
    message: 'interface_doc information has been updated',
    interface_doc,
  });
});

export const deleteElement = catchAsync(async (req, res) => {
  const { interface_doc } = req;

  await interface_doc.destroy();

  return res.status(200).json({
    status: 'success',
    message: `The interface_doc with id: ${interface_doc.id} has been deleted`,
  });
});
