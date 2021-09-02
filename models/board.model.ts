import Joi from 'joi';
import { getDB } from './../configs/database';

export interface IBoard {
  title: string;
  listOrder?: string[];
  createdAt?: number;
  updatedAt?: number;
  _destroy?: boolean;
}

const collection = 'boards';

const boardSchema = Joi.object<IBoard>({
  title: Joi.string().min(3).max(30).required(),
  listOrder: Joi.array().items(Joi.string()).default([]),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(Date.now()),
  _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data: IBoard) => {
  return await boardSchema.validateAsync(data, { abortEarly: false });
};

const createNew = async (data: IBoard) => {
  try {
    const board: IBoard = await validateSchema(data);
    const result = await getDB().collection(collection).insertOne(board);
    return result;
  } catch (error) {
    throw new Error(error).message;
  }
};

export default { createNew };
