# Qualification Task
### by Futuro Team

# Description
This is a test non-commercial task to prove your skills by code.
We want to see your capabilities to work with requirements and your code style.
We are not willing to get a huge, complex ready to go solution, it should be a short & professional result.

# Task
We want you to build a small knee-based booking engine.
It should have a rooms available for booking for specific time slots, a booking entries and a user who booked the room.

Room should have a name, unique id and associated time slots.
Bookings should have a room reference with specific time slot and a user who booked that room.
User should have a first, last names and an email.

We want to be able to see all bookings by specific user in API, all available slots for date by room and and all booked slots by date for room.

# Technologies

## General
- TypeScript as a software development language.
- NodeJS as a backend environment.
- NPM or Yarn as a Node package manager.
- MySQL or PostgreSQL as a relational database.
- Apollo as a GraphQL server.
- Feel free to use any NPM package you want.

## Backend
For backend we want to see at least:
- GraphQL schema and backend API. It could be Code-First, however we prefer schema-first solutions. It's up to you.
- You must implement nested types at schema.
- Each type should have a query/mutation for CRUD operation.
- You must implement data layer using the TypeORM / Sequelize ORM.
- We also love Docker based configurations, so don't hesitate to use a docker-compose.

# To run and test API:

0. Run postgreSQL database.
1. Add your credential for postgreSQL database to ormconfig.json file.
2. Go to /server folder.
3. Run "npm run seed" to create two default rooms with one time slot booked(optional).
4. Run "npm start".
5. Check requirement:
- Go to http://localhost:4000/graphql 
- To get user and bookings by id use query: {getUserBookings(id:id){...}}
- To get available time  slots in room by id use query: {availableSlotsRoom(id:id){...}} 
- To get booked time slots in room by id use query: {bookedSlotsRoom(id:id){...}}
- To get available time  slots in room by id and date use query: {availableSlotsRoomByDate(id:id, date:date){...}}
- To get booked time slots in room by id and date use query: {bookedSlotsRoomByDate(id:id, date:date){...}} 
6. Without step 2 you also can add a user with mutation createUser, add a room with mutation createRoom, add a booking with mutation createBooking.
