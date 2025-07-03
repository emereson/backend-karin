import express from 'express';
import * as fodaController from './foda.cotroller.js';
import * as fodaMiddleware from './foda.middleware.js';
import { upload } from '../../../utils/multer.js';

const router = express.Router();

router.get('/', fodaController.findAll);
router.post('/', fodaController.create);
router.post(
  '/documento/:id',
  upload.single('documento'),
  fodaMiddleware.validExistFoda,
  fodaController.cargarDocumento
);

router
  .route('/:id')
  .get(fodaMiddleware.validExistFoda, fodaController.findOne)
  .patch(fodaMiddleware.validExistFoda, fodaController.update)
  .delete(fodaMiddleware.validExistFoda, fodaController.deleteElement);

const fodaRouter = router;

export { fodaRouter };
