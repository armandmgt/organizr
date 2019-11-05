import { useMutation } from '@apollo/react-hooks';
import { Typography } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import withTheme from '@material-ui/core/styles/withTheme';
import TextField from '@material-ui/core/TextField';
import Zoom from '@material-ui/core/Zoom';
import AddIcon from '@material-ui/icons/Add';
import { gql } from 'apollo-boost';
import React from 'react';
import styled from 'styled-components';

import { GET_USERS } from '../pages/home';

const NAME_REGEX = /^[A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff]+(([',. -][A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff ])?[A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff]*)*$/;
const ADD_USER = gql`
  mutation($username: String!) {
    addUser(username: $username) {
      id
      username
    }
  }
`;

const AddUser = props => {
  const [open, setOpened] = React.useState(false);
  const handleOpen = () => setOpened(true);
  const handleClose = () => setOpened(false);

  const userInitialState = { username: '' };
  const [user, updateUser] = React.useState(userInitialState);
  const handleChangeUsername = ({ target: { value } }) =>
    updateUser({ ...user, username: value });
  const validate = () =>
    !!((user.username !== '') ^ !!user.username.match(NAME_REGEX));

  const [addUser] = useMutation(ADD_USER, {
    update(
      cache,
      {
        data: { addUser },
      }
    ) {
      const { users } = cache.readQuery({ query: GET_USERS });
      cache.writeQuery({
        query: GET_USERS,
        data: { users: users.concat([addUser]) },
      });
    },
  });
  const handleSubmit = e => {
    e.preventDefault();
    addUser({ variables: { username: user.username } })
      .then(({ data: { addUser } }) => updateUser(userInitialState))
      .catch(err => console.error(err));
  };

  return (
    <>
      <StyledFab color="primary" aria-label="add" onClick={handleOpen}>
        <AddIcon />
      </StyledFab>
      <Modal
        aria-labelledby="add-user-modal-title"
        aria-describedby="add-user-modal-description"
        open={open}
        onClose={handleClose}
      >
        <Zoom in={open}>
          <StyledPaper>
            <Typography variant="h6" id="add-user-modal-title">
              Add user
            </Typography>
            <p id="add-user-modal-description">Add an user to the list</p>
            <form onSubmit={handleSubmit}>
              <TextField
                id="username"
                label="Username"
                value={user.username}
                onChange={handleChangeUsername}
                error={validate()}
              />
            </form>
          </StyledPaper>
        </Zoom>
      </Modal>
    </>
  );
};

const StyledFab = withTheme(styled(Fab)`
  float: right;
  margin: ${({ theme }) => theme.spacing(2)}px;
`);

const StyledPaper = withTheme(styled(Paper)`
  position: absolute;
  top: calc(50% - 200px);
  left: calc(50% - 200px);
  width: 400px;
  padding: ${({ theme }) => theme.spacing(2)}px;
  outline: none;
`);

export default AddUser;
