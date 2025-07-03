import express from 'express';
import * as archivosFodaController from './archivosFoda.controller.js';
import * as archivosFodaMiddleware from './archivosFoda.middleware.js';
import { upload } from '../../../utils/multer.js';

const router = express.Router();

router.get('/', archivosFodaController.findAll);
router.post(
  '/',
  upload.single('material_apoyo'),
  archivosFodaController.create
);

router
  .route('/:id')
  .get(
    archivosFodaMiddleware.validExistArchivoFoda,
    archivosFodaController.findOne
  )
  .patch(
    archivosFodaMiddleware.validExistArchivoFoda,
    archivosFodaController.update
  )
  .delete(
    archivosFodaMiddleware.validExistArchivoFoda,
    archivosFodaController.deleteElement
  );

const archivosFodaRouter = router;

export { archivosFodaRouter };
