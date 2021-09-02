import { Request, Response } from 'express';
import HttpStatusCode from '../constants/httpStatusCode.constant';
import BoardService from '../services/board.service';

const createNew = async (req: Request, res: Response) => {
  try {
    const result = await BoardService.createNew(req.body);
    res.status(HttpStatusCode.CREATED).json({ result });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ errors: error });
  }
};

export default { createNew };
