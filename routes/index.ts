import { Request, Response, Router } from 'express';
import HttpStatusCode from '../constants/httpStatusCode.constant';
import BoardRoute from './board.route';
import CardRoute from './card.route';
import ListRoute from './list.route';

const router = Router();

router.get('/', (_: Request, res: Response) =>
  res.status(HttpStatusCode.OK).json({ status: 'OK' })
);

/** Boards APIs */
router.use('/boards', BoardRoute);

/** Lists APIs */
router.use('/lists', ListRoute);

/** Cards APIs */
router.use('/cards', CardRoute);

export default router;
