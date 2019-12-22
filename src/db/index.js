import { connect, connection, set, Schema, model } from 'mongoose';

set('useCreateIndex', true);
set('useFindAndModify', false);
set('useUnifiedTopology', true);

connect(
  `mongodb://${process.env.MONGO_NON_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@armandmgt.fr:27017/${process.env.MONGO_INITDB_DATABASE}`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

export default connection;
export { Schema, model };
