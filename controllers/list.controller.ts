import { Request, Response } from 'express';
import HttpStatusCode from '../constants/httpStatusCode.constant';
import * as ListService from '../services/list.service';

export const createNew = async (req: Request, res: Response) => {
  try {
    const result = await ListService.createNew(req.body);
    res.status(HttpStatusCode.CREATED).json({ result });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ errors: error });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await ListService.update(id, req.body);
    res.status(HttpStatusCode.OK).json({ result });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ errors: error });
  }
};
