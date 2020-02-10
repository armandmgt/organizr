import { connect, connection, set, Schema, model } from 'mongoose';

set('useCreateIndex', true);
set('useFindAndModify', false);
set('useUnifiedTopology', true);

connect(
  `mongodb://client:616161@vps.armandmgt.fr:27017/organizr`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

export default connection;
export { Schema, model };
