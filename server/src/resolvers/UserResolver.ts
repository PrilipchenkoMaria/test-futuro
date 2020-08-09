import { Arg, Mutation, Resolver, Query } from "type-graphql";
import { User } from "../entity/User";
import { getManager } from "typeorm";
import { CreateUserInput } from "../inputs/createUser";


@Resolver()
export class UserResolver {
  @Mutation(() => Boolean)
  async createUser(
    @Arg("data", { validate: false }) {
      firstName,
      lastName,
      email,
    }: CreateUserInput,
  ): Promise<boolean> {
    const entityManager = getManager();
    try {
      await entityManager.insert(User, {
        firstName,
        lastName,
        email,
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  @Query(() => User, { nullable: true })
  async getUserBookings(
    @Arg("id") id: number,
  ): Promise<User | null> {
    const entityManager = getManager();
    try {
      const user = await entityManager.findOne(User, id,
        { relations: ["bookings", "bookings.timeSlot", "bookings.timeSlot.room"] });
      return user ? user : null;
    } catch (error) {
      return null;
    }
  }

}
