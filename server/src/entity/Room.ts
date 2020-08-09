import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { TimeSlot } from "./TimeSlot";

@Entity()
export class Room {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => TimeSlot, timeSlot => timeSlot.room)
  timeSlots: TimeSlot[];

}
