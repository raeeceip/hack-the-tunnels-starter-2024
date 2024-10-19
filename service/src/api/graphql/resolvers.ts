import { createTimetable, getTimetableById, getAccountTimetables } from '../../services/Timetable';
import { Result } from 'ts-results';

export const root = {
  getTimetableById: async ({ id }: { id: number }) => {
    const result: Result<any, Error> = await getTimetableById(id);
    if (result.ok) {
      return result.val;
    } else {
      throw new Error(result.val.message);
    }
  },
  getAccountTimetables: async ({ email }: { email: string }) => {
    const result: Result<any, Error> = await getAccountTimetables(email);
    if (result.ok) {
      return result.val;
    } else {
      throw new Error(result.val.message);
    }
  },
  createTimetable: async ({ email, name, scheduledEventIds }: { email: string, name: string, scheduledEventIds: string[] }) => {
    const result: Result<any, Error> = await createTimetable(email, name, scheduledEventIds);
    if (result.ok) {
      return result.val;
    } else {
      throw new Error(result.val.message);
    }
  }
};