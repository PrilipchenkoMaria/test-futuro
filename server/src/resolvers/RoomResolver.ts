import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Room } from "../entity/Room";
import { getManager } from "typeorm";
import { CreateRoomInput } from "../inputs/createRoom";
import { TimeSlot } from "../entity/TimeSlot";


@Resolver()
export class RoomResolver {
  @Mutation(() => Boolean)
  async createRoom(
    @Arg("data", { validate: false }) {
      name,
      timeSlots,
    }: CreateRoomInput,
  ): Promise<boolean> {
    const entityManager = getManager();
    try {
      const timeSlotsEntities: TimeSlot[] = [];
      for (const timeSlot of timeSlots) {
        const timeSlotsEntity = new TimeSlot();
        timeSlotsEntity.availableFrom = timeSlot.availableFrom;
        timeSlotsEntity.availableUntil = timeSlot.availableUntil;
        await entityManager.save(timeSlotsEntity);
        timeSlotsEntities.push(timeSlotsEntity);
      }
      const room = new Room();
      room.name = name;
      room.timeSlots = timeSlotsEntities;
      await entityManager.save(room);
      return true;
    } catch (error) {
      return false;
    }
  }


  @Query(() => Room, { nullable: true })
  async getRoomFull(
    @Arg("id") id: number,
  ): Promise<Room | null> {
    const entityManager = getManager();
    try {
      const room = await entityManager.findOne(Room, id,
        { relations: ["timeSlots", "timeSlots.booking", "timeSlots.booking.user"] });
      return room ? room : null;
    } catch (error) {
      return null;
    }
  }


  @Query(() => [TimeSlot], { nullable: true })
  async bookedSlotsRoom(
    @Arg("id") id: number,
  ): Promise<TimeSlot[] | null> {
    const entityManager = getManager();
    try {
      const room = await entityManager.findOne(Room, id,
        { relations: ["timeSlots", "timeSlots.booking"] });
      if (room) return room.timeSlots.filter(slot => !!slot.booking);
      else return [];
    } catch (error) {
      return null;
    }
  }

  @Query(() => [TimeSlot], { nullable: true })
  async bookedSlotsRoomByDate(
    @Arg("date", { validate: false }) date: Date,
    @Arg("id") id: number,
  ): Promise<TimeSlot[] | null> {
    const entityManager = getManager();
    try {
      const room = await entityManager.findOne(Room, id,
        { relations: ["timeSlots", "timeSlots.booking"] });
      if (room) return room.timeSlots.filter(slot => slot.availableFrom.getTime() <= date.getTime() &&
        slot.availableUntil.getTime() >= date.getTime() && !!slot.booking);
      else return [];
    } catch (error) {
      return null;
    }
  }


  @Query(() => [TimeSlot], { nullable: true })
  async availableSlotsRoom(
    @Arg("id") id: number,
  ): Promise<TimeSlot[] | null> {
    const entityManager = getManager();
    try {
      const room = await entityManager.findOne(Room, id,
        { relations: ["timeSlots", "timeSlots.booking"] });
      if (room) return room.timeSlots.filter(slot => !slot.booking);
      else return [];
    } catch (error) {
      return null;
    }
  }


  @Query(() => [TimeSlot], { nullable: true })
  async availableSlotsRoomByDate(
    @Arg("date", { validate: false }) date: Date,
    @Arg("id") id: number,
  ): Promise<TimeSlot[] | null> {
    const entityManager = getManager();
    try {
      const room = await entityManager.findOne(Room, id,
        { relations: ["timeSlots", "timeSlots.booking"] });
      if (room) return room.timeSlots.filter(slot => slot.availableFrom.getTime() <= date.getTime() &&
        slot.availableUntil.getTime() >= date.getTime() && !slot.booking);
      else return [];
    } catch (error) {
      return null;
    }
  }

}
