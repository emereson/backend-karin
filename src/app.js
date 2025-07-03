import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import rateLimit from 'express-rate-limit';
import xss from 'xss-clean';

import { AppError } from './utils/AppError.js';

import { globalErrorHandler } from './utils/error.controllers.js';
import { formatoRouter } from './modules/moduloFoda/formato/formato.routes.js';
import { archivosFodaRouter } from './modules/moduloFoda/archivosFoda/archivosFoda.routes.js';
import { materialApoyoRouter } from './modules/moduloFoda/material_apoyo/material_apoyo.routes.js';
import { fodaRouter } from './modules/moduloFoda/foda/foda.routes.js';
import { fodaNotaRouter } from './modules/moduloFoda/fodaNota/fodaNota.routes.js';

const app = express();

app.set('trust proxy', 1);
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in one hour.',
});

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(cors());
app.use(xss());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(hpp());
app.use('/api/v1', limiter);
app.use('/api/v1/foda', fodaRouter);
app.use('/api/v1/foda-nota', fodaNotaRouter);

app.use('/api/v1/formato', formatoRouter);
app.use('/api/v1/material-apoyo', materialApoyoRouter);

app.use('/api/v1/archivos-foda', archivosFodaRouter);

app.all('*', (req, res, next) => {
  return next(
    new AppError(`Can't find ${req.originalUrl} on this server! 💀`, 404)
  );
});

app.use((err, req, res, next) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message });
  } else {
    next(err);
  }
});

app.use(globalErrorHandler);

export { app };
