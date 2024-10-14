# Hack The Tunnels - Starter 2024

![Hack The Tunnels](https://i.imgur.com/1NCyXkn.png)

This is the project template for [Hack The Tunnels](https://ccss.carleton.ca/hackthetunnels/).

The project template utilizes [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Express](https://expressjs.com/), and [Prisma](https://www.prisma.io/).

## Project Setup

Before you can set up the project, you will need to install [Node.js](https://nodejs.org/en).

To get the project working, you will need to have both the client and server running.

### Client Setup

1. Move into the client directory

```
cd client
```

2. Install client dependencies

```
npm install
```

3. Run the client

```
npm run dev
```

### Service Setup

Follow the following instructions in a 2nd terminal while your client is running.

1. Move into the service directory

```
cd service
```

2. Install service dependencies

```
npm install
```

3. Run Migrations

```
npx prisma migrate dev
```

4. Run the service

```
npm run dev
```

# Documentation

The project template for this year is a recreation of the **infamously hard to use Carleton Central**.

Students will be tasked with recreating and improving many of the core components of the application.

## Views

### Login Page - `/`

### Menu Page - `/`

### Build Timetable Page - `/timetables/build`

### Timetables Page - `/timetables`

### View Timetable Page - `/timetables/:id`

## API Routes

This application's RESTful API is powered by Express.js

All routes are appended underneith `{root}/api/v1/`. Ex: `http://localhost:5000/api/v1/scheduledEvents`

**NOTE:** Any endpoint that **requires authorization** must be appended with the **Authorization header** and **jwt token** retrieved from the [login endpoint](#login---post-login).

Example Authorization Header:

```
authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiYWRtaW5AZW1haWwuY29tIiwiaWF0IjoxNzI4OTMzNTE2fQ.RM6l7bRyl7gGVeT6prdkaTu_LBB9vWobotIT2CwjLTM
```

### Login - `POST /login`

This route returns a JWT token if the user succesfully entered a corresponding email and password.

Example Payload:

```json
{
  "email": "admin@email.com",
  "password": "password"
}
```

Example Response:

```json
{
  "data": {
    "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiYWRtaW5AZW1haWwuY29tIiwiaWF0IjoxNzI4OTMzNTE2fQ.RM6l7bRyl7gGVeT6prdkaTu_LBB9vWobotIT2CwjLTM"
  },
  "error": null
}
```

### All Scheduled Events - `GET /scheduledEvents`

This route returns a list of available scheduled events.

Example Response: 

```json
{
  "data": [
    {
      "id": 986,
      "crn": "11116",
      "section": "A",
      "instructor": "Leila Chinaei",
      "credit": "0.5",
      "type": "Lecture",
      "term": "Winter 2025 (January-April)",
      "days": "Mon,Wed",
      "startTime": "10:05",
      "endTime": "11:25",
      "additionalRegistrationRequirements": "",
      "url": "https://central.carleton.ca/prod/bwysched.p_display_course?wsea_code=EXT&term_code=202510&disp=22184566&crn=11116",
      "description": "Section Type - IN-PERSON SECTION.For Arts & Social Science students only. See also fall term.Laptop required for all first year COMP courses.See https://carleton.ca/scs/scs-laptop-requirement/.Precludes additional credit for COMP 1004 (no longeroffered). This course cannot be taken for credit bystudents in Business, Engineering, Computer Science,Mathematics or Science.",
      "courseId": 1291,
      "createdAt": "2024-10-12T20:09:35.101Z",
      "updatedAt": "2024-10-12T20:09:35.101Z",
      "course": {
        "id": 1291,
        "subjectCode": "COMP",
        "courseCode": "1001",
        "title": "Introduction to Computational Thinking for Arts and Social Science Students",
        "shortTitle": "Computing for Arts Students",
        "description": "An introduction to computational thinking and its applications to the arts and social sciences.  Students will gain computational thinking skills by exploring data representation, basic programming concepts, a selection of algorithms, and advanced usage of software packages for the arts and social sciences.   Precludes additional credit for COMP 1004 (no longer offered).  This course cannot be taken for credit by students in Business, Engineering, Computer Science, Mathematics or Science.",
        "createdAt": "2024-10-12T20:09:32.190Z",
        "updatedAt": "2024-10-12T20:09:32.190Z"
      }
    },
    ...
  ],
  "error": null
}
```

### Account's Timetables - `GET /timetables`- **AUTH REQUIRED**

This route returns back a list of timetables created by the **authorized account**.

```json
{
  "data": [
    {
      "id": 1,
      "name": "Timetable Example Name",
      "items": [
        {
          "id": 986,
          "crn": "11116",
          "section": "A",
          "instructor": "Leila Chinaei",
          "credit": "0.5",
          "type": "Lecture",
          "term": "Winter 2025 (January-April)",
          "days": "Mon,Wed",
          "startTime": "10:05",
          "endTime": "11:25",
          "additionalRegistrationRequirements": "",
          "url": "https://central.carleton.ca/prod/bwysched.p_display_course?wsea_code=EXT&term_code=202510&disp=22184566&crn=11116",
          "description": "Section Type - IN-PERSON SECTION.For Arts & Social Science students only. See also fall term.Laptop required for all first year COMP courses.See https://carleton.ca/scs/scs-laptop-requirement/.Precludes additional credit for COMP 1004 (no longeroffered). This course cannot be taken for credit bystudents in Business, Engineering, Computer Science,Mathematics or Science.",
          "courseId": 1291,
          "course": {
            "id": 1291,
            "subjectCode": "COMP",
            "courseCode": "1001",
            "title": "Introduction to Computational Thinking for Arts and Social Science Students",
            "shortTitle": "Computing for Arts Students",
            "description": "An introduction to computational thinking and its applications to the arts and social sciences.  Students will gain computational thinking skills by exploring data representation, basic programming concepts, a selection of algorithms, and advanced usage of software packages for the arts and social sciences.   Precludes additional credit for COMP 1004 (no longer offered).  This course cannot be taken for credit by students in Business, Engineering, Computer Science, Mathematics or Science."
          }
        },
        ...
      ]
    },
  ],
  "error": null
}
```

### Create Timetable - `POST timetables` - **AUTH REQUIRED**

This route is used to create a new timetable associated with the authorized account.

Example Payload:

```json
{
  "name": "Example Timetable Name",
  "scheduledEventIds": [
    "986",
    "987"
  ]
}
```

### View Timetable - `GET /timetables/:id`- **AUTH REQUIRED**

This route is used to view a timetable created by the authorized account.

```json
{
  "data": {
    "id": 3,
    "name": "Example Timetable name",
    "items": [
      {
        "id": 986,
        "crn": "11116",
        "section": "A",
        "instructor": "Leila Chinaei",
        "credit": "0.5",
        "type": "Lecture",
        "term": "Winter 2025 (January-April)",
        "days": "Mon,Wed",
        "startTime": "10:05",
        "endTime": "11:25",
        "additionalRegistrationRequirements": "",
        "url": "https://central.carleton.ca/prod/bwysched.p_display_course?wsea_code=EXT&term_code=202510&disp=22184566&crn=11116",
        "description": "Section Type - IN-PERSON SECTION.For Arts & Social Science students only. See also fall term.Laptop required for all first year COMP courses.See https://carleton.ca/scs/scs-laptop-requirement/.Precludes additional credit for COMP 1004 (no longeroffered). This course cannot be taken for credit bystudents in Business, Engineering, Computer Science,Mathematics or Science.",
        "courseId": 1291,
        "course": {
          "id": 1291,
          "subjectCode": "COMP",
          "courseCode": "1001",
          "title": "Introduction to Computational Thinking for Arts and Social Science Students",
          "shortTitle": "Computing for Arts Students",
          "description": "An introduction to computational thinking and its applications to the arts and social sciences.  Students will gain computational thinking skills by exploring data representation, basic programming concepts, a selection of algorithms, and advanced usage of software packages for the arts and social sciences.   Precludes additional credit for COMP 1004 (no longer offered).  This course cannot be taken for credit by students in Business, Engineering, Computer Science, Mathematics or Science."
        }
      },
      ...
    ]
  },
  "error": null
}
```

## Database Schema

This application is powered by a relational database with the following schema.

The schema can be viewed in detail within the Prisma Schema file located at:  
`service/src/db/schema.prisma`

![Prisma Entity-Relationship Diagram](assets/prisma-erd.svg)

### Account

The `Account` model represents a user in the system. Each account has a unique email and password and can have one or more associated timetables.

- **id**: Unique identifier for the account.
- **email**: Email address for the account (unique).
- **password**: Password for the account.
- **role**: Role of the user in the system (e.g., admin, user).
- **createdAt**: Timestamp indicating when the account was created.
- **updatedAt**: Timestamp automatically updated when the account information changes.
- **timetables**: A one-to-many relationship with the `Timetable` model.

### Course

The `Course` model represents a course offering, including details such as its subject code, title, and description. Each course can have multiple scheduled events.

- **id**: Unique identifier for the course.
- **subjectCode**: Subject code for the course (e.g., COMP).
- **courseCode**: Course number (e.g., 1405).
- **title**: Full course title.
- **shortTitle**: Abbreviated course title.
- **description**: Detailed description of the course.
- **createdAt**: Timestamp indicating when the course was created.
- **updatedAt**: Timestamp automatically updated when the course information changes.
- **scheduledEvents**: A one-to-many relationship with the `ScheduledEvent` model.

### Scheduled Event

The `ScheduledEvent` model represents an offering of a course section, including details like the instructor, schedule, and location. Each scheduled event is linked to a course and can have multiple timetable events.

- **id**: Unique identifier for the scheduled event.
- **crn**: Course Reference Number (unique).
- **section**: Section identifier for the event (e.g., A01).
- **instructor**: Instructor name.
- **credit**: Credit value of the course.
- **type**: Type of event (e.g., Lecture, Lab).
- **term**: Term during which the event is offered.
- **days**: Days of the week when the event occurs.
- **startTime**: Start time of the event.
- **endTime**: End time of the event.
- **additionalRegistrationRequirements**: Additional requirements for enrollment.
- **url**: URL for the event's details.
- **description**: Description of the event.
- **courseId**: Foreign key linking the event to a course.
- **course**: Many-to-one relationship with the `Course` model.
- **createdAt**: Timestamp indicating when the event was created.
- **updatedAt**: Timestamp automatically updated when the event information changes.
- **timetableEvents**: A one-to-many relationship with the `TimetableEvent` model.

### Timetable

The `Timetable` model represents a user's schedule, which includes multiple timetable events associated with different scheduled events.

- **id**: Unique identifier for the timetable.
- **name**: User-defined name for the timetable.
- **accountId**: Foreign key linking the timetable to an account.
- **account**: Many-to-one relationship with the `Account` model.
- **createdAt**: Timestamp indicating when the timetable was created.
- **updatedAt**: Timestamp automatically updated when the timetable information changes.
- **timetableEvents**: A one-to-many relationship with the `TimetableEvent` model.

### Timetable Event

The `TimetableEvent` model represents the association of a scheduled event with a timetable. This allows users to add scheduled events to their personal timetables.

- **id**: Unique identifier for the timetable event.
- **scheduledEventId**: Foreign key linking the event to a scheduled event.
- **scheduledEvent**: Many-to-one relationship with the `ScheduledEvent` model.
- **timetableId**: Foreign key linking the event to a timetable.
- **timetable**: Many-to-one relationship with the `Timetable` model.
- **createdAt**: Timestamp indicating when the timetable event was created.
- **updatedAt**: Timestamp automatically updated when the timetable event information changes.
