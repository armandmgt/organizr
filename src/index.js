import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './schemas';
import resolvers from './resolvers';
import AuthDirective from './auth/authDirective';

config();

const app = express();
app.use(cors());
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'public')));

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

app.get('*', (req, res) => {
  console.log(req);
  res.sendFile(path.join(__dirname, 'public/index.html'));
});
server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: process.env.PORT }, () => {
  console.log(`Apollo Server on http://localhost:${process.env.PORT}/graphql`);
});
