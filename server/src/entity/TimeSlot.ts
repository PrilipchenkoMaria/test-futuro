import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from "typeorm";
import { Room } from "./Room";
import { Field, ID, ObjectType } from "type-graphql";
import { Booking } from "./Booking";


@Entity()
@ObjectType("TimeSlotObject")
export class TimeSlot {

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column("timestamp")
  availableFrom: Date;

  @Field()
  @Column("timestamp")
  availableUntil: Date;

  @Field(() => Room, { nullable: true })
  @ManyToOne(() => Room, room => room.timeSlots)
  room: Room;

  @Field(() => Booking, { nullable: true })
  @OneToOne(() => Booking, booking => booking.timeSlot)
  booking: Booking[];

}
