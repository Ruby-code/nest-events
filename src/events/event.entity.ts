import { User } from "src/auth/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Attendee } from "./attendee.entity";

@Entity()
export class Event{
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true})
    name: string;

    @Column() 
    when: Date;

    @Column()
    address: string;

    @Column()
    description: string;

    @OneToMany(() => Attendee, (attendee) => attendee.event, {
        cascade: true
    })
    @JoinTable()
    attendees: Attendee[];

    // @ManyToOne(() => User, (user) => user.organized)
    // @JoinColumn({ name: 'organizerId'})
    // organizer: User;

    // @Column({ nullable: true})
    // organizerId: number;

    attendeeCount?: number;
    attendeeRejected?: number;
    attendeeMaybe: number;
    attendeeAccepted?: number;

}