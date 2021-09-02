import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import HttpStatusCode from '../constants/httpStatusCode.constant';

const createNew = async (req: Request, res: Response, next: NextFunction) => {
  const condition = Joi.object({
    title: Joi.string().min(3).max(20).required(),
  });

  try {
    await condition.validateAsync(req.body);
    next();
  } catch (error) {
    res
      .status(HttpStatusCode.BAD_REQUEST)
      .json({ errors: new Error(error).message });
  }
};

export default { createNew };
