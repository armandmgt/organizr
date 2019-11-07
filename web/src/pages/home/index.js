import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { gql } from 'apollo-boost';
import React from 'react';
import { Query } from 'react-apollo';

import client from '../../apollo';
import auth, { GET_VIEWER } from '../../auth';
import AddUser from '../../components/AddUser';
import StyledPaper from '../../components/StyledPaper';
import UserList from '../../components/UserList';

export const GET_USERS = gql`
  query ListUsers {
    users {
      id
      username
    }
  }
`;

const Home = () => {
  console.log('rendering Home');
  const { viewer } = client.readQuery({
    query: GET_VIEWER,
    variables: { token: auth.getToken() },
  });
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <StyledPaper>
            <Typography variant="h4" gutterBottom>
              Hello again,{' '}
              <Typography variant="h4" component="span" color="primary">
                {viewer.username || viewer.email}
              </Typography>
            </Typography>
            <Typography variant="body1">
              Here is a recap of what you have to do:
            </Typography>
            <Typography variant="caption">
              Nothing to see here yet...
            </Typography>
          </StyledPaper>
        </Grid>
        <Grid item xs={12}>
          <StyledPaper>
            <Box position="relative">
              <Query query={GET_USERS}>
                {({ loading, data }) =>
                  loading ? (
                    <div>loading...</div>
                  ) : (
                    <UserList users={data.users} />
                  )
                }
              </Query>
              <AddUser />
            </Box>
          </StyledPaper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
