import { useQuery } from '@apollo/react-hooks';
import Typography from '@material-ui/core/Typography';
import { gql } from 'apollo-boost';
import React from 'react';

import StyledPaper from '../../components/StyledPaper';

export const GET_VIEWER = gql`
  query Viewer {
    viewer {
      email
      username
    }
  }
`;

const UserRecap = () => {
  const { loading, error, data } = useQuery(GET_VIEWER);

  return (
    <StyledPaper>
      {loading || error ? (
        <div>loading...</div>
      ) : (
        <>
          <Typography variant="h4" gutterBottom>
            Hello again,{' '}
            <Typography variant="h4" component="span" color="primary">
              {data.viewer.username || data.viewer.email}
            </Typography>
          </Typography>
          <Typography variant="body1">
            Here is a recap of what you have to do:
          </Typography>
          <Typography variant="caption">Nothing to see here yet...</Typography>
        </>
      )}
    </StyledPaper>
  );
};

export default UserRecap;
