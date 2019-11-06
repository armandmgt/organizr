import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { gql } from 'apollo-boost';
import React from 'react';
import { Query } from 'react-apollo';

import auth from '../../auth';
import AddUser from '../../components/AddUser';
import { StyledPaper } from '../../components/StyledPaper';
import UserList from '../../components/UserList';

export const GET_VIEWER = gql`
  query Viewer($token: String!) {
    viewer(token: $token) {
      ... on User {
        email
        username
      }
      ... on Error {
        codes
        messages
      }
    }
  }
`;

export const GET_USERS = gql`
  query ListUsers {
    users {
      id
      username
    }
  }
`;

const Home = () => (
  <div>
    <Grid container spacing={3}>
      <Query query={GET_VIEWER} variables={{ token: auth.getToken() || '' }}>
        {({ loading, data }) =>
          loading ? (
            <div>loading...</div>
          ) : (
            <Grid item xs={12}>
              <StyledPaper>
                <Typography variant="h4" gutterBottom>
                  Hello again,{' '}
                  <Typography variant="h4" component="span" color="primary">
                    {data.viewer.username || data.viewer.email}
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
          )}
      </Query>
      <Query query={GET_USERS}>
        {({ loading, data }) =>
          loading ? (
            <div>loading...</div>
          ) : (
            <Grid item xs={12}>
              <StyledPaper>
                <Box position="relative">
                  <UserList users={data.users} />
                  <AddUser />
                </Box>
              </StyledPaper>
            </Grid>
          )
        }
      </Query>
    </Grid>
  </div>
);

export default Home;
