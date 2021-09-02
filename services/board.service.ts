import BoardModel, { IBoard } from '../models/board.model';

export const createNew = async (data: IBoard) => {
  try {
    const result = await BoardModel.createNew(data);
    return result;
  } catch (error) {
    throw new Error(error).message;
  }
};
