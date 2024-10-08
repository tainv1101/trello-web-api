import { MongoClient, ServerApiVersion } from 'mongodb';
import { env } from '~/config/environment';

let trelloDatabaseInstance = null;

// Cái này sẽ kết nối với mongodb
let mongodbClientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
});

export const connectDB = async () => {
  //Gọi kết nối đến Mongodb Atlas với URI khai báo (cái chuỗi dài thòn có tài khoàn và mật khẩu)
  await mongodbClientInstance.connect();
  // kết nối thành công thì lấy database đã tạo ở mongo, nhớ truyền tên db đã tạo
  trelloDatabaseInstance = mongodbClientInstance.db(env.DATABASE_NAME);
};

export const getDB = () => {
  if (!trelloDatabaseInstance) throw new Error('Chưa kết nối đến db kìa~~');
  return trelloDatabaseInstance;
};

export const closeDB = async () => {
  await trelloDatabaseInstance.close();
};
