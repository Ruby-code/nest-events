import { Expose } from "class-transformer";
import { type } from "os";
import { User } from "src/auth/user.entity";
import { PaginationResult } from "src/pagination/paginator";
import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Attendee } from "./attendee.entity";

@Entity()
export class Event{
    //Another way to do it
    // constructor(partial: Partial<Event>){
    //     Object.assign(this, partial );
    // }
    
    @PrimaryGeneratedColumn()
    @Expose()
    id: number;

    @Column({ unique: true})
    @Expose()
    name: string;

    @Column() 
    @Expose()
    when: Date;

    @Column()
    @Expose()
    address: string;

    @Column()
    @Expose()
    description: string;

    @OneToMany(() => Attendee, 
    (attendee) => attendee.event, {
        cascade: true
    })
    @Expose()
    attendees: Attendee[];

    @ManyToOne(() => User, (user) => user.organized)
    @JoinColumn({ name: 'organizerId'})
    @Expose()
    organizer: User;

    @Column({ nullable: true})
    organizerId: number;

    @Expose()
    attendeeCount?: number;
    @Expose()
    attendeeRejected?: number;
    @Expose()
    attendeeMaybe?: number;
    @Expose()
    attendeeAccepted?: number;

}

export type PaginatedEvents = PaginationResult<Event>;