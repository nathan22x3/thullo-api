import Joi from 'joi';
import { getDB } from '../configs/database';

export interface IList {
  boardId: string;
  title: string;
  cardOrder?: string[];
  createdAt?: number;
  updatedAt?: number;
  _destroy?: boolean;
}

const collection = 'lists';

const listSchema = Joi.object<IList>({
  boardId: Joi.string().required(),
  title: Joi.string().min(3).max(20).required(),
  cardOrder: Joi.array().items(Joi.string()).default([]),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(Date.now()),
  _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data: IList) => {
  return await listSchema.validateAsync(data, { abortEarly: false });
};

const createNew = async (data: IList) => {
  try {
    const list: IList = await validateSchema(data);
    const result = await getDB().collection(collection).insertOne(list);
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const ListModel = { createNew };
