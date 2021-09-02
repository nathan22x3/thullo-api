import BoardModel, { IBoard } from '../models/board.model';

export const createNew = async (data: IBoard) => {
  try {
    const result = await BoardModel.createNew(data);
    return result;
  } catch (error) {
    throw new Error(error).message;
  }
};

export const getFullBoard = async (id: string) => {
  try {
    const board = await BoardModel.getFullBoard(id);

    board.lists.forEach((list) => {
      list.cards = board.cards.filter(
        (card) => card.listId.toString() === list._id.toString()
      );
    });
    delete board.cards;

    return board;
  } catch (error) {
    throw new Error(error).message;
  }
};
