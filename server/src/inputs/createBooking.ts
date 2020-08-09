import { Field, InputType } from "type-graphql";


@InputType()
export class CreateBookingInput {

  @Field()
  timeSlotsId: number;

  @Field()
  userId: number;

}
