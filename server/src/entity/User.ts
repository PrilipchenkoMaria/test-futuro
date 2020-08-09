import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Booking } from "./Booking";
import { Field, ID, ObjectType } from "type-graphql";

@Entity()
@ObjectType("UserObject")
export class User {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column() 
    firstName: string;

    @Field()
    @Column()
    lastName: string;

    @Field()
    @Column()
    email: string;

    @Field(_ => [Booking], { nullable: true })
    @OneToMany(() => Booking, booking => booking.user)
    bookings: Booking[];

}
