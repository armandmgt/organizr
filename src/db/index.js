import { connect, connection, model, Schema, set } from 'mongoose';

set('useCreateIndex', true);

connect(
  `mongodb://root:${process.env.MONGO_INITDB_ROOT_PASSWORD}@armandmgt.fr:27017/organizr`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

connection.on('error', console.error.bind(console, 'MongoDB error: '));

export default connection;
export { Schema, model };
