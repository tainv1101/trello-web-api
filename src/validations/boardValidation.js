import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';
import ApiError from '~/utils/ApiError';


const createNewBoard = async (req, res, next) => {
  const boardSchema = Joi.object({
    title: Joi.string().required().min(3).max(30).trim().strict(),
    description: Joi.string().min(3).max(256).trim().strict()
  });

  try {
    await boardSchema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    console.log('error stack', error.stack);
    const errorMessage = new Error(error).message;
    const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage);
    next(customError);
  }
};

export const boardValidations = {

  createNewBoard: createNewBoard
};