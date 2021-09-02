import { Request, Response, Router } from 'express';
import HttpStatusCode from '../constants/httpStatusCode.constant';
import BoardRoute from './board.route';

const router = Router();

router.get('/', (_: Request, res: Response) =>
  res.status(HttpStatusCode.OK).json({ status: 'OK' })
);

/** Board APIs */
router.use('/board', BoardRoute);

export const api = router;
