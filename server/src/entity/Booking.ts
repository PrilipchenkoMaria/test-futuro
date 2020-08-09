import { Entity, PrimaryGeneratedColumn, OneToOne, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { TimeSlot } from "./TimeSlot";

@Entity()
export class Booking {

  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => TimeSlot)
  @JoinColumn()
  timeSlot: TimeSlot;

  @ManyToOne(() => User, user => user.bookings)
  user: User;

}
