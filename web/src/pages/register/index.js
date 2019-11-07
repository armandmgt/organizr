import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import withTheme from '@material-ui/core/styles/withTheme';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { gql } from 'apollo-boost';
import React from 'react';
import { useMutation } from 'react-apollo';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import auth from '../../auth';
import ErrorSnackbar from '../../components/ErrorSnackbar';
import { StyledAvatar } from '../../components/SignInForm/StyledAvatar';
import { StyledPaper } from '../../components/SignInForm/StyledPaper';

const REGISTER = gql`
  mutation RegisterUser(
    $email: String!
    $password: String!
    $username: String
  ) {
    registerUser(email: $email, password: $password, username: $username) {
      token
    }
  }
`;

const Register = () => {
  const history = useHistory();
  const [formData, updateForm] = React.useState({ email: '', password: '' });
  const handleChangeUsername = ({ target: { value } }) =>
    updateForm({ ...formData, username: value });
  const handleChangeEmail = ({ target: { value } }) =>
    updateForm({ ...formData, email: value });
  const handleChangePassword = ({ target: { value } }) =>
    updateForm({ ...formData, password: value });

  const [registerUser, { error }] = useMutation(REGISTER);
  const handleSubmit = e => {
    e.preventDefault();
    registerUser({ variables: { ...formData } })
      .then(({ data: { registerUser } }) => {
        if (registerUser.token) {
          auth.setToken(registerUser.token);
          history.push('/');
        }
      })
      .catch(() => {});
  };

  return (
    <Container component="main" maxWidth="xs">
      <StyledPaper>
        <StyledAvatar>
          <EditOutlinedIcon />
        </StyledAvatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Form noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChangeEmail}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChangePassword}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="username"
            label="Username"
            name="name"
            onChange={handleChangeUsername}
          />
          <SubmitButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign In
          </SubmitButton>
          <Grid container>
            <Grid item>
              <Link to="/signin" variant="body2" component={RouterLink}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Form>
      </StyledPaper>
      {error && (
        <ErrorSnackbar
          message={error.graphQLErrors[0].extensions.formattedMessage}
        />
      )}
    </Container>
  );
};

const Form = withTheme(styled.form`
  width: 100%; // Fix IE 11 issue.
  margin-top: ${({ theme }) => theme.spacing(1)}px;
`);

const SubmitButton = withTheme(styled(Button)`
  margin: ${({ theme }) => theme.spacing(3, 0, 2)};
`);

export default Register;
