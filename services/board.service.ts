import BoardModel, { IBoard } from '../models/board.model';

const createNew = async (data: IBoard) => {
  try {
    const result = await BoardModel.createNew(data);
    return result;
  } catch (error) {
    throw new Error(error).message;
  }
};

export default { createNew };
