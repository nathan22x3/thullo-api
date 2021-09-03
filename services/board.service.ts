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
    const fullBoard = await BoardModel.getFullBoard(id);

    fullBoard.lists.forEach((list) => {
      list.cards = fullBoard.cards.filter((card) =>
        card.listId.equals(list._id)
      );
    });
    delete fullBoard.cards;

    return fullBoard;
  } catch (error) {
    throw new Error(error).message;
  }
};
