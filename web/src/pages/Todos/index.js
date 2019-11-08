import Grid from '@material-ui/core/Grid';
import { gql } from 'apollo-boost';
import React from 'react';
import { useQuery } from 'react-apollo';

import StyledPaper from '../../components/StyledPaper';

const GET_TODOS = gql`
  query GetTodos {
      users {
          todos {
              title
          }
      }
  }
`;

const Todos = () => {
  const { loading, data } = useQuery(GET_TODOS);
  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <StyledPaper>
            {loading ? <div>loading...</div> : JSON.stringify(data)}
          </StyledPaper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Todos;
