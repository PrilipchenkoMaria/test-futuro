import { Arg, Mutation, Resolver } from "type-graphql";
import { Booking } from "../entity/Booking";
import { getManager } from "typeorm";
import { CreateBookingInput } from "../inputs/createBooking";
import { User } from "../entity/User";
import { TimeSlot } from "../entity/TimeSlot";


@Resolver()
export class BookingResolver {
  @Mutation(() => Boolean)
  async createBooking(
    @Arg("data", { validate: false }) {
      userId,
      timeSlotsId,
    }: CreateBookingInput,
  ): Promise<boolean> {
    const entityManager = getManager();
    try {
      const user: User | undefined = await entityManager.findOne(User, userId);
      const timeSlot = await entityManager.findOne(TimeSlot, timeSlotsId);
      const booking = new Booking();
      if (timeSlot && user) {
        booking.timeSlot = timeSlot;
        booking.user = user;
        await entityManager.save(booking);
        return true;
      } else return false;
    } catch (error) {
      return false;
    }
  }
}

