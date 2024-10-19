import { ScheduledEvent } from "@prisma/client";
import { prisma } from "../db";
import { Result, Ok } from "ts-results";

export const ScheduledEventService = {
  getFirst: async (count: number): Promise<Result<ScheduledEvent[], Error>> => {
    const events = await prisma.scheduledEvent.findMany({
      take: count,
      where: {
        term: {
          contains: "Winter 2025 (January-April)",
        },
        course: {
          subjectCode: {
            contains: "COMP",
          },
        },
      },
      include: {
        course: true,
      },
    });

    return Ok(events);
  },

  getRecommendations: async (
    day: string,
    startTime: string,
    endTime: string,
  ): Promise<Result<ScheduledEvent[], Error>> => {
    const events = await prisma.scheduledEvent.findMany({
      where: {
        days: {
          contains: day,
        },
        startTime: {
          lte: endTime,
        },
        endTime: {
          gte: startTime,
        },
      },
      include: {
        course: true,
      },
    });

    return Ok(events);
  },
};