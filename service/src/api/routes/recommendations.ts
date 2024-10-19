import express, { Request, Response } from "express";
import { ScheduledEventService } from "../../services/ScheduledEvent";
import { success } from "../utils";

const router = express.Router();

const getRecommendations = async (request: Request, response: Response) => {
  const { day, startTime, endTime } = request.query;

  try {
    const result = await ScheduledEventService.getRecommendations(day as string, startTime as string, endTime as string);

    if (result.err) {
      throw result.val;
    }

    return success(response, {
      data: result.val,
      statusCode: 200,
    });
  } catch (error) {
    return response.status(500).json({ error: 'Failed to fetch recommendations' });
  }
};

router.get("/", getRecommendations);

export default router;