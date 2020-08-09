import { Entity, PrimaryGeneratedColumn, OneToOne, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { TimeSlot } from "./TimeSlot";
import { Field, ID, ObjectType } from "type-graphql";

@Entity()
@ObjectType("BookingObject")
export class Booking {

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => TimeSlot, { nullable: true })
  @OneToOne(() => TimeSlot)
  @JoinColumn()
  timeSlot: TimeSlot;

  @Field(() => User)
  @ManyToOne(() => User, user => user.bookings)
  user: User;

}
