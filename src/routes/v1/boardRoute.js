import express from 'express';
import { StatusCodes } from 'http-status-codes';
const Router = express.Router();
import { boardValidations } from '~/validations/boardValidation';
import { boardController } from '~/controllers/boardController';

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({
      message: 'Get Board'
    });
  })
  .post(boardValidations.createNewBoard, boardController.createNewBoard);

export const boardRoute = Router;