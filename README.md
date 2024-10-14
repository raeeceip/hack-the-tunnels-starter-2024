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

**NOTE:** Any endpoint that **requires authorization** must be appended with the **Authorization header** and **jwt token** retrieved from the [login endpoint](#login).

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
			"id": 1,
			"crn": "10001",
			"section": "A",
			"instructor": " ",
			"credit": "0.5",
			"type": "Seminar",
			"term": "Winter 2025 (January-April)",
			"days": "Tue",
			"startTime": "18:05",
			"endTime": "20:55",
			"additionalRegistrationRequirements": "",
			"url": "https://central.carleton.ca/prod/bwysched.p_display_course?wsea_code=EXT&term_code=202510&disp=22184566&crn=10001",
			"description": "Section Type - IN-PERSON.",
			"courseId": 1,
			"createdAt": "2024-10-07T01:24:35.418Z",
			"updatedAt": "2024-10-07T01:24:35.418Z",
			"course": {
				"id": 1,
				"subjectCode": "ACCT",
				"courseCode": "5001",
				"title": "Financial Accounting",
				"shortTitle": "Financial Accounting",
				"description": "Fundamentals of financial accounting. Techniques used to measure business transactions, preparation of financial statements, recording and valuation of assets, liabilities and equities.      Precludes additional credit for BUSI 5004 (no longer offered).",
				"createdAt": "2024-10-07T01:24:32.195Z",
				"updatedAt": "2024-10-07T01:24:32.195Z"
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

### Account

### Course

### Scheduled Event

### Timetable

### Timetable Event
