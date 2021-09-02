import Joi from 'joi';
import { ObjectId } from 'mongodb';
import { getDB } from '../configs/database';

export interface ICard {
  boardId: ObjectId;
  listId: ObjectId;
  title: string;
  cover?: string;
  createdAt?: number;
  updatedAt?: number;
  _destroy?: boolean;
}

const collection = 'cards';

const cardSchema = Joi.object<ICard>({
  boardId: Joi.string().length(24).required(),
  listId: Joi.string().length(24).required(),
  title: Joi.string().min(3).max(30).required(),
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
    const validateValue: ICard = await validateSchema(data);
    const doc = {
      ...validateValue,
      boardId: new ObjectId(validateValue.boardId),
      listId: new ObjectId(validateValue.listId),
    };
    const result = await getDB()
      .collection<ICard>(collection)
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

const update = async (id: string, data: ICard) => {
  try {
    const result = await getDB()
      .collection<ICard>(collection)
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

export default { createNew, update };
