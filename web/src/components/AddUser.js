import Fab from '@material-ui/core/Fab';
import withTheme from '@material-ui/core/styles/withTheme';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';
import styled from 'styled-components';

const AddUser = props => {
  return (
    <StyledFab color="primary" aria-label="add">
      <AddIcon />
    </StyledFab>
  );
};

const StyledFab = withTheme(styled(Fab)`
  float: right;
  margin: ${({ theme }) => theme.spacing(2)}px;
`);

export default AddUser;
