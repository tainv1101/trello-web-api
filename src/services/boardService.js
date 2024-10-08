/* eslint-disable no-useless-catch */
import { slugify } from '~/utils/formatters';
const createNewBoard = async (reqBody) => {
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    };

    return newBoard;

  } catch (error) {
    throw error;
  }
};

export const boardService = {
  createNewBoard
};