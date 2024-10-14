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

4. Add the Seed Data

```
npx prisma db seed
```

5. Run the service

```
npm run dev
```