import { Router } from 'express';
import * as BoardController from '../controllers/board.controller';
import * as BoardValidation from '../validations/board.validation';

const router = Router();

router.post('/create', BoardValidation.createNew, BoardController.createNew);

export default router;
