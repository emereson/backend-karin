import express from 'express';
import * as fodaNotaController from './fodaNota.cotroller.js';
import * as fodaNotaMiddleware from './fodaNota.middleware.js';

const router = express.Router();

router.get('/', fodaNotaController.findAll);
router.post('/:id', fodaNotaController.create);

router
  .route('/:id')
  .get(fodaNotaMiddleware.validExistFoda, fodaNotaController.findOne)
  .patch(fodaNotaMiddleware.validExistFoda, fodaNotaController.update)
  .delete(fodaNotaMiddleware.validExistFoda, fodaNotaController.deleteElement);

const fodaNotaRouter = router;

export { fodaNotaRouter };
