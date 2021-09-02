import { Router } from 'express';
import * as ListController from '../controllers/list.controller';
import * as ListValidation from '../validations/list.validation';

const router = Router();

router.post('/create', ListValidation.createNew, ListController.createNew);
router.put('/:id', ListValidation.update, ListController.update);

export default router;
