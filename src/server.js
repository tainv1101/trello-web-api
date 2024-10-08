import express from 'express';
import exitHook from 'async-exit-hook';
import { connectDB, getDB, closeDB } from '~/config/mongodb';
import { env } from '~/config/environment';
import { APIs_V1 } from '~/routes/v1';
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware';
import { StatusCodes } from 'http-status-codes';

const START_SERVER = () => {
  const app = express();

  // cho pheps body sử dụng json data
  app.use(express.json());
  // Khi truy cập đúng tuyến đường thì code trong route sẽ chạy, giống route trong reactjs
  // use này giống à tao chạy code thằng này nè và thêm cái path ở đầu nữa
  app.use('/v1', APIs_V1);

  app.get('/', (req, res) => {
    res.end('<h1>Hello World!</h1><hr>');
  });

  // Error Handler xử lý lỗi tập trung, tất cả các lỗi
  app.use(errorHandlingMiddleware);

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(`Hello Trung Quan Dev, I am running at ${ env.APP_HOST }:${ env.APP_PORT }/`);
  });

  exitHook(() => {
    closeDB();
  });
};

connectDB()
  .then(() => {
    console.log('Kết nối thành công ^^');
  })
  .then(() => {
    START_SERVER();
  })
  .catch((erorr) => {
    console.log(erorr);
    process.exit(0);
  });

