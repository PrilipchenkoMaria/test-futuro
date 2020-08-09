import { Field, InputType } from "type-graphql";


@InputType()
export class CreateTimeSlotInput {

  @Field(()=> Date)
  availableFrom: Date;

  @Field(()=> Date)
  availableUntil: Date;

}
