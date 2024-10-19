import express, { Request, Response } from "express";
import { AccountRouter, ScheduledEventRouter, TimetableRouter } from "./routes";
import { graphqlHTTP } from 'express-graphql';
import { schema } from './graphql/schema';
import { root } from './graphql/resolvers';

const router = express.Router();

const getAPIRoot = async (_: Request, response: Response) => {
  response.json({
    message: "API - 👋",
  });
};

router.get("/", getAPIRoot);
router.use("/", AccountRouter);
router.use("/scheduledEvents", ScheduledEventRouter);
router.use("/timetables", TimetableRouter);
router.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
export default router;
