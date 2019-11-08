import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { createHttpLink } from 'apollo-link-http';

import auth from './auth';
import history from './history';

const httpLink = createHttpLink({ uri: 'http://localhost:8000/graphql' });

const authLink = setContext((_, prevContext) => {
  if (prevContext.publicRequest) return prevContext;
  // get the authentication token from local storage if it exists
  const token = auth.getToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...prevContext.headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const logoutLink = onError(({ graphQLErrors }) => {
  graphQLErrors.forEach(e => {
    if (e.extensions.code === 'UNAUTHENTICATED') {
      history.push('/signin');
    }
  });
});

const link = ApolloLink.from([authLink, logoutLink, httpLink]);

const cache = new InMemoryCache();

export default new ApolloClient({
  cache,
  link,
});
