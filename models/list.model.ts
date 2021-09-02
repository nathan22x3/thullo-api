import { ICard } from './card.model';
import Joi from 'joi';
import { ObjectId } from 'mongodb';
import { getDB } from '../configs/database';

export interface IList {
  boardId: ObjectId;
  title: string;
  cardOrder?: ObjectId[];
  createdAt?: number;
  updatedAt?: number;
  _destroy?: boolean;
}

const collection = 'lists';

const listSchema = Joi.object<IList>({
  boardId: Joi.string().length(24).required(),
  title: Joi.string().min(3).max(30).required(),
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
    const validateValue: IList = await validateSchema(data);
    const doc = {
      ...validateValue,
      boardId: new ObjectId(validateValue.boardId),
    };
    const result = await getDB()
      .collection<IList>(collection)
      .insertOne(doc)
      .then((value) => ({
        ...doc,
        _id: value.insertedId,
      }));

    return result;
  } catch (error) {
    throw new Error(error).message;
  }
};

const update = async (id: string, data: IList) => {
  try {
    const result = await getDB()
      .collection<IList>(collection)
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: data },
        { returnDocument: 'after' }
      );

    return result.value;
  } catch (error) {
    throw new Error(error).message;
  }
};

const pushCardOrder = async (listId: ObjectId, cardId: ObjectId) => {
  try {
    const result = await getDB()
      .collection<IList>(collection)
      .findOneAndUpdate(
        { _id: listId },
        { $push: { cardOrder: cardId }, $set: { updatedAt: Date.now() } },
        { returnDocument: 'after' }
      );

    return result.value;
  } catch (error) {
    throw new Error(error).message;
  }
};

export default { createNew, update, pushCardOrder };
