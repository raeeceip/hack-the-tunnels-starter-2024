import express, { Request, Response } from "express";
import { AccountRouter, ScheduledEventRouter } from "./routes";

const router = express.Router();

const getAPIRoot = async (_: Request, response: Response) => {
  response.json({
    message: "API - 👋",
  });
};

router.get("/", getAPIRoot);
router.use("/", AccountRouter);
router.use("/scheduledEvents", ScheduledEventRouter);

export default router;
