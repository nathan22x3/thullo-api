import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import HttpStatusCode from '../constants/httpStatusCode.constant';

export const createNew = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const condition = Joi.object({
    boardId: Joi.string().length(24).required(),
    title: Joi.string().min(3).max(30).required(),
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

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const condition = Joi.object({
    title: Joi.string().min(3).max(30),
  });

  try {
    await condition.validateAsync(req.body, {
      abortEarly: false,
      allowUnknown: true,
    });
    next();
  } catch (error) {
    res
      .status(HttpStatusCode.BAD_REQUEST)
      .json({ errors: new Error(error).message });
  }
};
