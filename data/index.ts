import { makeExecutableSchema } from 'graphql-tools';

import { schema, schema2 } from './schema';
import { resolverMap, resolverMap2 } from './resolvers';

export { createLoaders } from './loaders';
export { Context } from './types';


export const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers: resolverMap,
});

export const executableSchema2 = makeExecutableSchema({
  typeDefs: schema2,
  resolvers: resolverMap2,
  
});