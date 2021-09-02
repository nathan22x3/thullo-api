import { Router } from 'express';
import * as CardController from '../controllers/card.controller';
import * as CardValidation from '../validations/card.validation';

const router = Router();

router.post('/create', CardValidation.createNew, CardController.createNew);
router.put('/:id', CardValidation.update, CardController.update);

export default router;
