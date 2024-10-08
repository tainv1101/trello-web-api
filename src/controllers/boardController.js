import { StatusCodes } from 'http-status-codes';
import ApiError from '~/utils/ApiError';
import { boardService } from '~/services/boardService';
const createNewBoard = async (req, res, next) => {
  try {
    // lấy dữ liệu
    const createdBoard = await boardService.createNewBoard(req.body);
    // trả dữ liệu đã lấy
    res.status(StatusCodes.OK).json(createdBoard);
  } catch (error) {
    next(error);
  }
};

export const boardController = {
  createNewBoard
};