import CardModel, { ICard } from '../models/card.model';

export const createNew = async (data: ICard) => {
  try {
    const result = await CardModel.createNew(data);
    return result;
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
