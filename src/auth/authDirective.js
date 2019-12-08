import { DirectiveLocation, GraphQLDirective, defaultFieldResolver } from 'graphql';
import { SchemaDirectiveVisitor } from 'graphql-tools';
import { AuthenticationError } from 'apollo-server';
import verifyToken, { getId } from './verifyToken';
import User from '../models/users';

export default class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field, details) {
    this.ensureAuthorizationPerformed(field);
  }

  /* eslint-disable no-param-reassign */
  /* eslint-disable class-methods-use-this */
  ensureAuthorizationPerformed(field) {
    const { resolve = defaultFieldResolver } = field;

    field.resolve = async function newResolve(...args) {
      const context = args[2];
      if (!verifyToken(context.token)) {
        throw new AuthenticationError('Invalid token');
      }
      context.me = await User.findById(getId(context.token))
        .select('email password username')
        .exec();
      if (context.me) return resolve.apply(this, args);
      throw new AuthenticationError('Invalid token');
    };
  }
  /* eslint-enable class-methods-use-this */
  /* eslint-enable no-param-reassign */

  static getDirectiveDeclaration(directiveName, schema) {
    return new GraphQLDirective({
      name: directiveName,
      locations: [DirectiveLocation.FIELD_DEFINITION],
      args: {},
    });
  }
}
