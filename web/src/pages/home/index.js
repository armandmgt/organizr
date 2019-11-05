import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import withTheme from '@material-ui/core/styles/withTheme';
import Typography from '@material-ui/core/Typography';
import { gql } from 'apollo-boost';
import React from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';

import AddUser from '../../components/AddUser';
import UserList from '../../components/UserList';

export const GET_ME = gql`
  query {
    me {
      username
    }
  }
`;

export const GET_USERS = gql`
  query {
    users {
      id
      username
    }
  }
`;

const Home = () => (
  <div>
    <Grid container spacing={3}>
      <Query query={GET_ME}>
        {({ loading, data }) =>
          loading ? (
            <div>loading...</div>
          ) : (
            <Grid item xs={12}>
              <StyledPaper>
                <Typography variant="h4" gutterBottom>
                  Hello again,{' '}
                  <Typography variant="h4" component="span" color="primary">
                    {data.me.username}
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
          )
        }
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

const StyledPaper = withTheme(styled(Paper)`
  padding: ${({ theme }) => theme.spacing(2)}px;
  display: flex;
  overflow: auto;
  flex-direction: column;
`);

export default Home;
