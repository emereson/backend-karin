import express from 'express';
import * as interdaceDocsController from './interface.cotroller.js';
import * as interfaceDocsMiddleware from './interface.middleware.js';

const router = express.Router();

router.get('/', interdaceDocsController.findAll);
router.post('/', interdaceDocsController.create);

router
  .route('/:id')
  .get(
    interfaceDocsMiddleware.validExistInterfaceDocs,
    interdaceDocsController.findOne
  )
  .patch(
    interfaceDocsMiddleware.validExistInterfaceDocs,
    interdaceDocsController.update
  )
  .delete(
    interfaceDocsMiddleware.validExistInterfaceDocs,
    interdaceDocsController.deleteElement
  );

export { router as interfaceDocRouter };
