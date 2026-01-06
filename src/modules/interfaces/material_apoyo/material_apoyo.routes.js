import express from 'express';
import { upload } from '../../../utils/multer.js';
import * as materialApoyoController from './material_apoyo.controller.js';
import * as materialApoyoMiddleware from './material_apoyo.middleware.js';

const router = express.Router();

router.get('/all/:id', materialApoyoController.findAll);
router.post(
  '/:id',
  upload.single('material_apoyo'),
  materialApoyoController.create
);

router
  .route('/:id')
  .get(
    materialApoyoMiddleware.validExistMaterialApoyo,
    materialApoyoController.findOne
  )
  .patch(
    materialApoyoMiddleware.validExistMaterialApoyo,
    materialApoyoController.update
  )
  .delete(
    materialApoyoMiddleware.validExistMaterialApoyo,
    materialApoyoController.deleteElement
  );

const materialApoyoRouter = router;

export { materialApoyoRouter };
