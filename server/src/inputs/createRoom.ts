import { Field, InputType } from "type-graphql";
import { CreateTimeSlotInput } from "./createTimeSlot";


@InputType()
export class CreateRoomInput {

  @Field()
  name: string;

  @Field(() => [CreateTimeSlotInput])
  timeSlots: CreateTimeSlotInput[];

}
