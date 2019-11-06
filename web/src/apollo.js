import ApolloClient from 'apollo-boost';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [],
    },
  },
});

const cache = new InMemoryCache({ fragmentMatcher });

export default new ApolloClient({
  cache,
  uri: 'http://localhost:8000/graphql',
});
