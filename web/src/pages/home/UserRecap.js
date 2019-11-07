import Typography from '@material-ui/core/Typography';
import React from 'react';

import StyledPaper from '../../components/StyledPaper';

export function UserRecap(props) {
  return (
    <StyledPaper>
      <Typography variant="h4" gutterBottom>
        Hello again,{' '}
        <Typography variant="h4" component="span" color="primary">
          {props.viewer.username || props.viewer.email}
        </Typography>
      </Typography>
      <Typography variant="body1">
        Here is a recap of what you have to do:
      </Typography>
      <Typography variant="caption">Nothing to see here yet...</Typography>
    </StyledPaper>
  );
}
