import Grid from '@material-ui/core/Grid';
import React from 'react';

import client from '../../apollo';
import auth, {GET_VIEWER} from '../../auth';
import UserList from './UserList';
import {UserRecap} from './UserRecap';

const Home = () => {
  const { viewer } = client.readQuery({
    query: GET_VIEWER,
    variables: { token: auth.getToken() },
  });
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <UserRecap viewer={viewer} />
        </Grid>
        <Grid item xs={12}>
          <UserList />
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
