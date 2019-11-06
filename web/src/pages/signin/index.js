import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import withTheme from '@material-ui/core/styles/withTheme';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';

const SignIn = () => (
  <Container component="main" maxWidth="xs">
    <StyledPaper>
      <StyledAvatar>
        <LockOutlinedIcon />
      </StyledAvatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Form noValidate>
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
            <Link to="#" variant="body2" component={RouterLink}>
              Don’t have an account? Sign Up
            </Link>
          </Grid>
        </Grid>
      </Form>
    </StyledPaper>
  </Container>
);

const StyledPaper = withTheme(styled.div`
  margin-top: ${({ theme }) => theme.spacing(8)}px;
  display: flex;
  flex-direction: column;
  align-items: center;
`);

const StyledAvatar = withTheme(styled(Avatar)`
  margin: ${({ theme }) => theme.spacing(1)}px;
  background-color: ${({ theme }) => theme.palette.secondary.main};
`);

const Form = withTheme(styled.form`
  width: 100%; // Fix IE 11 issue.
  margin-top: ${({ theme }) => theme.spacing(1)}px;
`);

const SubmitButton = withTheme(styled(Button)`
  margin: ${({ theme }) => theme.spacing(3, 0, 2)};
`);

export default SignIn;
