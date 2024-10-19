import { Timetable, ScheduledEvent } from "@prisma/client";
import { prisma } from "../db";
import { Result, Ok, Err } from "ts-results";
import { AccountService } from ".";
import { sendDiscordMessage } from "./discordService";

// Function to create a timetable
export const createTimetable = async (
  email: string,
  name: string,
  scheduledEventIds: string[],
): Promise<Result<Timetable, Error>> => {
  // Find the account by email
  const account = await AccountService.findByEmail(email);

  if (account === null) {
    return Err(new Error("Account not found"));
  }

  // Fetch all scheduled events to check for overlaps
  const scheduledEvents = await prisma.scheduledEvent.findMany({
    where: {
      id: {
        in: scheduledEventIds.map((id) => parseInt(id)),
      },
    },
  });

  // Check for overlapping events
  for (let i = 0; i < scheduledEvents.length; i++) {
    for (let j = i + 1; j < scheduledEvents.length; j++) {
      if (isOverlapping(scheduledEvents[i], scheduledEvents[j])) {
        return Err(new Error(`Event ${scheduledEvents[i].id} overlaps with event ${scheduledEvents[j].id}`));
      }
    }
  }

  // Create the timetable
  const timetable = await prisma.timetable.create({
    data: {
      name,
      account: {
        connect: {
          id: account.id,
        },
      },
      timetableEvents: {
        create: scheduledEventIds.map((id) => ({
          scheduledEvent: {
            connect: {
              id: parseInt(id),
            },
          },
        })),
      },
    },
  });

  // Send a Discord message to the general chat with timetable details
  const timetableDetails = scheduledEvents.map(event => `Course: ${event.courseId}, Start: ${event.startTime}, End: ${event.endTime}`).join('\n');
  await sendDiscordMessage(`@everyone A new timetable has been created for ${email}:\n\n${timetableDetails}`);

  // Return the created timetable and a message indicating that an email has been sent
  return Ok(timetable);
};

// Function to check if two events overlap
const isOverlapping = (event1: ScheduledEvent, event2: ScheduledEvent): boolean => {
  const start1 = new Date(event1.startTime).getTime();
  const end1 = new Date(event1.endTime).getTime();
  const start2 = new Date(event2.startTime).getTime();
  const end2 = new Date(event2.endTime).getTime();

  return (start1 < end2 && start2 < end1);
};

// Function to get a timetable by ID
export const getTimetableById = async (
  id: number,
): Promise<Result<Timetable, Error>> => {
  const timetable = await prisma.timetable.findUnique({
    where: {
      id: id, // Ensure id is correctly passed
    },
    include: {
      timetableEvents: {
        include: {
          scheduledEvent: {
            include: {
              course: true,
            },
          },
        },
      },
    },
  });

  if (timetable === null) {
    return Err(new Error("Timetable not found"));
  }

  return Ok(timetable);
};

// Function to get all timetables for an account
export const getAccountTimetables = async (
  email: string,
): Promise<Result<Timetable[], Error>> => {
  const account = await AccountService.findByEmail(email);

  if (account === null) {
    return Err(new Error("Account not found"));
  }

  const timetables = await prisma.timetable.findMany({
    where: {
      accountId: account.id,
    },
    include: {
      timetableEvents: {
        include: {
          scheduledEvent: {
            include: {
              course: true,
            },
          },
        },
      },
    },
  });

  return Ok(timetables);
};