import ListModel, { IList } from '../models/list.model';

export const createNew = async (data: IList) => {
  try {
    const result = await ListModel.createNew(data);
    return result;
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
