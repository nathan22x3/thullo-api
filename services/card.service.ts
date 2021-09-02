import CardModel, { ICard } from '../models/card.model';
import ListModel from '../models/list.model';

export const createNew = async (data: ICard) => {
  try {
    const insertedCard = await CardModel.createNew(data);

    // update cardOrder in List collection
    await ListModel.pushCardOrder(insertedCard.listId, insertedCard._id);

    return insertedCard;
  } catch (error) {
    throw new Error(error).message;
  }
};

export const update = async (id: string, data: ICard) => {
  try {
    const updateData: ICard = {
      ...data,
      updatedAt: Date.now(),
    };

    const result = await CardModel.update(id, updateData);
    return result;
  } catch (error) {
    throw new Error(error).message;
  }
};
