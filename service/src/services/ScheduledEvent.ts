import { ScheduledEvent } from "@prisma/client";
import { prisma } from "../db";
import { Result, Ok } from "ts-results";

export const getFirst = async (
  count: number,
): Promise<Result<ScheduledEvent[], Error>> => {
  const events = await prisma.scheduledEvent.findMany({
    take: count,
    include: {
      course: true,
    },
  });

  const res = await prisma.scheduledEvent.findMany({
    where: {
      course: {
        title: {
          startsWith: "Math",
        },
      },
    },
    include: {
      course: true,
    },
  });

  const courses = await prisma.course.findMany({
    where: {
      title: {
        startsWith: "Math",
      },
    },
  });

  console.log("events", res);

  return Ok(events);
};
