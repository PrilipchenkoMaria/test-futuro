import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Room } from "./Room";


@Entity()
export class TimeSlot {

  @PrimaryGeneratedColumn()
  id: number;

  @Column("datetime")
  availableFrom: Date;

  @Column("datetime")
  availableUntil: Date;

  @ManyToOne(() => Room, room => room.timeSlots)
  room: Room;

}
