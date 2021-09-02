import { Request, Response } from 'express';
import HttpStatusCode from '../constants/httpStatusCode.constant';
import * as CardService from '../services/card.service';

export const createNew = async (req: Request, res: Response) => {
  try {
    const result = await CardService.createNew(req.body);
    res.status(HttpStatusCode.CREATED).json({ result });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ errors: error });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await CardService.update(id, req.body);
    res.status(HttpStatusCode.OK).json({ result });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ errors: error });
  }
};
