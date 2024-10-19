import { buildSchema } from 'graphql';

export const schema = buildSchema(`
  type Timetable {
    id: Int
    name: String
    accountId: Int
    timetableEvents: [TimetableEvent]
  }

  type TimetableEvent {
    id: Int
    scheduledEvent: ScheduledEvent
  }

  type ScheduledEvent {
    id: Int
    courseId: String
    startTime: String
    endTime: String
  }

  type Query {
    getTimetableById(id: Int!): Timetable
    getAccountTimetables(email: String!): [Timetable]
  }

  type Mutation {
    createTimetable(email: String!, name: String!, scheduledEventIds: [String]!): Timetable
  }
`);