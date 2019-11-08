import Grid from '@material-ui/core/Grid';
import React from 'react';

import UserList from './UserList';
import UserRecap from './UserRecap';

const Dashboard = () => {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <UserRecap />
        </Grid>
        <Grid item xs={12}>
          <UserList />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
