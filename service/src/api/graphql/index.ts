import { graphqlHTTP } from 'express-graphql';
import { schema } from './schema';
import { root } from './resolvers';
import express from 'express';

const router = express.Router();

router.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

export default router;