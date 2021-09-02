import { Router } from 'express';
import BoardController from '../controllers/board.controller';
import BoardValidation from '../validations/board.validation';

const router = Router();

router.post('/create', BoardValidation.createNew, BoardController.createNew);

export default router;
