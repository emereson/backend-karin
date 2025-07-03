import express from 'express';
import { upload } from '../../../utils/multer.js';
import * as formatoController from './formato.controller.js';
import * as formatoMiddleware from './formato.middleware.js';

const router = express.Router();

router.get('/', formatoController.findAll);
router.post('/', upload.single('formato'), formatoController.create);

router
  .route('/:id')
  .get(formatoMiddleware.validExistFormato, formatoController.findOne)
  .patch(formatoMiddleware.validExistFormato, formatoController.update)
  .delete(formatoMiddleware.validExistFormato, formatoController.deleteElement);

const formatoRouter = router;

export { formatoRouter };
