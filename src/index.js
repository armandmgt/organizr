import cors from 'cors';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './schemas';
import resolvers from './resolvers';
import AuthDirective from './auth/authDirective';

const app = express();
app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives: {
    auth: AuthDirective,
  },
  context: async ({ req }) => {
    let token = req.headers.authorization || '';
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }

    return { token };
  },
});

server.applyMiddleware({ app, path: '/graphql' });
app.listen({ port: 8000 }, () => {
  console.log('Apollo Server on http://localhost:8000/graphql');
});
