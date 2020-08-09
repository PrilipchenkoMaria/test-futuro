import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { TimeSlot } from "./TimeSlot";
import { Field, ID, ObjectType } from "type-graphql";

@Entity()
@ObjectType("RoomObject")
export class Room {

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(_ => [TimeSlot], { nullable: true })
  @OneToMany(() => TimeSlot, timeSlot => timeSlot.room)
  timeSlots: TimeSlot[];

}
