import { ICard } from './card.model';
import Joi from 'joi';
import { ObjectId } from 'mongodb';
import { getDB } from './../configs/database';
import { IList } from './list.model';

export interface IBoard {
  title: string;
  listOrder?: ObjectId[];
  createdAt?: number;
  updatedAt?: number;
  _destroy?: boolean;
}

interface IFullBoard extends IBoard {
  lists: IFullList[];
  cards?: ICard[];
}
interface IFullList extends IList {
  _id: ObjectId;
  cards: ICard[];
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
    const doc: IBoard = await validateSchema(data);
    const result = await getDB()
      .collection<IBoard>(collection)
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

const pushListOrder = async (boardId: ObjectId, listId: ObjectId) => {
  try {
    const result = await getDB()
      .collection<IBoard>(collection)
      .findOneAndUpdate(
        { _id: boardId },
        { $push: { listOrder: listId }, $set: { updatedAt: Date.now() } },
        { returnDocument: 'after' }
      );

    return result.value;
  } catch (error) {
    throw new Error(error).message;
  }
};

const getFullBoard = async (id: string) => {
  try {
    const result = await getDB()
      .collection(collection)
      .aggregate<IFullBoard>([
        { $match: { _id: new ObjectId(id) } },
        {
          $lookup: {
            from: 'lists',
            localField: '_id',
            foreignField: 'boardId',
            as: 'lists',
          },
        },
        {
          $lookup: {
            from: 'cards',
            localField: '_id',
            foreignField: 'boardId',
            as: 'cards',
          },
        },
      ])
      .toArray();

    return result[0];
  } catch (error) {
    throw new Error(error).message;
  }
};

export default { createNew, pushListOrder, getFullBoard };
