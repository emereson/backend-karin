import bcrypt from 'bcryptjs';
import { catchAsync } from '../../utils/catchAsync.js';
import { User } from './user.model.js';
import { generateJWT } from '../../utils/jwt.js';
import { Op } from 'sequelize';
import { AppError } from '../../utils/AppError.js';

export const findAll = catchAsync(async (req, res, next) => {
  const { search, rol, page = 1, limit = 100 } = req.query;

  const whereFilter = {};

  if (search && search.trim().length > 0) {
    whereFilter[Op.or] = [
      { nombre: { [Op.like]: `%${search}%` } },
      { email: { [Op.like]: `%${search}%` } },
      { telefono: { [Op.like]: `%${search}%` } },
    ];
  }

  if (rol) {
    whereFilter.role = rol;
  }

  const offset = (page - 1) * limit;

  const users = await User.findAndCountAll({
    where: whereFilter,
    order: [['id', 'DESC']],
    limit: parseInt(limit),
    offset: parseInt(offset),
  });

  const totalPages = Math.ceil(users.count / limit);

  return res.status(200).json({
    status: 'Success',
    results: users.rows.length,
    total: users.count,
    currentPage: parseInt(page),
    totalPages,
    users: users.rows,
  });
});

export const findOne = catchAsync(async (req, res, next) => {
  const { user } = req;

  return res.status(200).json({
    status: 'Success',
    user,
  });
});

export const signup = catchAsync(async (req, res, next) => {
  const { nombre, email, fecha_nacimiento, password, sexo, telefono, role } =
    req.body;

  const purgarCorreo = email.trim().toLowerCase().replace(/\s+/g, '');

  const salt = await bcrypt.genSalt(12);
  const encryptedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    nombre,
    email: purgarCorreo,
    fecha_nacimiento,
    password: encryptedPassword,
    sexo,
    telefono,
    role,
  });

  res.status(201).json({
    status: 'success',
    message: 'the user has been created successfully!',
    user,
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const purgarCorreo = email.trim().toLowerCase().replace(/\s+/g, '');

  const user = await User.findOne({
    where: {
      email: purgarCorreo,
    },
  });
  if (!user) {
    return next(new AppError('El usuario no se encuentra registrado', 404));
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Contraseña incorrecta', 401));
  }

  const token = await generateJWT(user.id);

  res.status(201).json({
    status: 'success',
    token,
    user,
  });
});

export const update = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { nombre, email, fecha_nacimiento, newpassword, sexo, telefono, role } =
    req.body;

  const purgarCorreo = email.trim().toLowerCase().replace(/\s+/g, '');

  const salt = await bcrypt.genSalt(12);

  let encryptedPassword = null;

  if (newpassword?.length > 3) {
    encryptedPassword = await bcrypt.hash(newpassword, salt);
  }

  await user.update({
    nombre,
    email: purgarCorreo,
    fecha_nacimiento,
    password: encryptedPassword || user.password,
    sexo,
    telefono,
    role,
  });

  res.status(201).json({
    status: 'success',
    message: 'the user has been created successfully!',
    user,
  });
});

export const deleteItem = catchAsync(async (req, res) => {
  const { user } = req;

  await user.destroy();

  return res.status(200).json({
    status: 'success',
    message: `The user with id: ${user.id} has been deleted`,
  });
});
