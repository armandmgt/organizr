import { connect, connection, model, Schema } from 'mongoose';

connect(
  'mongodb://armandmgt.fr:27017/organizr',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

connection.on('error', console.error.bind(console, 'MongoDB error: '));

export default connection;
export { Schema, model };
