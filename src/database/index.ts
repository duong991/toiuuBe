import { connect, set } from 'mongoose';
import { NODE_ENV, DB_HOST, DB_PORT, DB_DATABASE } from '@config';

export const dbConnection = async () => {
  const dbConfig = {
    // url: `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
    url: 'mongodb://localhost:27017/toiuu',
  };

  if (NODE_ENV !== 'production') {
    set('debug', true);
  }

  await connect(dbConfig.url);
};
