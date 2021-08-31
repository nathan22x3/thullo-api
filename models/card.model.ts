import Joi from 'joi';
import { Types } from 'mongoose';
import { getDB } from '../configs/database';

export interface ICard {
  boardId: Types.ObjectId;
  cardId: Types.ObjectId;
  title: string;
  cover?: string;
  createdAt?: number;
  updatedAt?: number;
  _destroy?: boolean;
}

const collection = 'cards';

const cardSchema = Joi.object<ICard>({
  boardId: Joi.object<Types.ObjectId>().required(),
  cardId: Joi.object<Types.ObjectId>().required(),
  title: Joi.string().min(3).max(20).required(),
  cover: Joi.string().default(null),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(Date.now()),
  _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data: ICard) => {
  return await cardSchema.validateAsync(data, { abortEarly: false });
};

const createNew = async (data: ICard) => {
  try {
    const card: ICard = await validateSchema(data);
    const result = await getDB().collection(collection).insertOne(card);
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const CardModel = { createNew };
