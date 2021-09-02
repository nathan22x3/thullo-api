import BoardModel from '../models/board.model';
import ListModel, { IList } from '../models/list.model';

export const createNew = async (data: IList) => {
  try {
    const insertedList = await ListModel.createNew(data);

    // update listOrder in Board collection
    await BoardModel.pushListOrder(insertedList.boardId, insertedList._id);

    return insertedList;
  } catch (error) {
    throw new Error(error).message;
  }
};

export const update = async (id: string, data: IList) => {
  try {
    const updateData: IList = {
      ...data,
      updatedAt: Date.now(),
    };

    const result = await ListModel.update(id, updateData);
    return result;
  } catch (error) {
    throw new Error(error).message;
  }
};
