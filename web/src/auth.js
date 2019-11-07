import { gql } from 'apollo-boost';
import React from 'react';
import { useQuery } from 'react-apollo';
import { Redirect, useHistory } from 'react-router-dom';

export const TOKEN_KEY = '_organizrJwt';

export const GET_VIEWER = gql`
  query Viewer($token: String!) {
    viewer(token: $token) {
      email
      username
    }
  }
`;

const auth = {
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },
  setToken(token) {
    return localStorage.setItem(TOKEN_KEY, token);
  },
  deleteToken() {
    return localStorage.removeItem(TOKEN_KEY);
  },
};

export const RequireAuth = ({ children }) => {
  const { loading, error } = useQuery(GET_VIEWER, {
    variables: { token: auth.getToken() },
    skip: !auth.getToken(),
    fetchPolicy: 'network-only',
  });

  const history = useHistory();
  if (!auth.getToken()) return !!history.push('/signin');
  if (loading) return <div>loading...</div>;
  if (
    error &&
    error.graphQLErrors.findIndex(
      e => e.extensions.code === 'UNAUTHENTICATED'
    ) !== -1
  )
    return <Redirect to="/signin" />;

  return children;
};

export default auth;
