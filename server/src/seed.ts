import "reflect-metadata";
import { createConnection, EntityManager } from "typeorm";
import { User } from "./entity/User";
import { Room } from "./entity/Room";
import { TimeSlot } from "./entity/TimeSlot";
import { Booking } from "./entity/Booking";

const today = new Date();
const tomorrow = new Date(today.getTime() + 1000 * 60 * 60 * 24);
const yesterday = new Date(today.getTime() - 1000 * 60 * 60 * 24);
const defaultTimeSlots = [
  {
    availableFrom: yesterday,
    availableUntil: today,
  },
  {
    availableFrom: today,
    availableUntil: tomorrow,
  },
];

async function createTimeSlots(entityManager: EntityManager,
                               timeSlots: { availableFrom: Date, availableUntil: Date }[]) {
  const timeSlotsEntities: TimeSlot[] = [];
  for (const timeSlot of timeSlots) {
    const timeSlotsEntity = new TimeSlot();
    timeSlotsEntity.availableFrom = timeSlot.availableFrom;
    timeSlotsEntity.availableUntil = timeSlot.availableUntil;
    await entityManager.save(timeSlotsEntity);
    timeSlotsEntities.push(timeSlotsEntity);
  }
  return timeSlotsEntities;
}

async function createRoom(entityManager: EntityManager, user: User, name: string) {
  const room = new Room();
  room.name = name;
  room.timeSlots = await createTimeSlots(entityManager, defaultTimeSlots);
  await entityManager.save(room);
  const booking1 = new Booking();
  booking1.timeSlot = room.timeSlots[0];
  booking1.user = user;
  await entityManager.save(booking1);
  console.log("Saved a new room with id: " + room.id);
}

createConnection().then(async connection => {
  const user = new User();
  user.firstName = "John";
  user.lastName = "Snow";
  user.email = "test@test.com";
  await connection.manager.save(user);
  await createRoom(connection.manager, user,"test_room1");
  await createRoom(connection.manager, user,"test_room2");
}).catch(error => console.log(error));
