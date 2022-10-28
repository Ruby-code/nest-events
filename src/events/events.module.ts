import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from 'src/auth/user.entity';
import { Attendee } from './attendee.entity';
import { Event } from './event.entity';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

@Module({
    imports: [
       TypeOrmModule.forFeature([Event]),
       TypeOrmModule.forFeature([Attendee]),
    ],
    controllers: [EventsController],
    providers: [ EventsService
        // {
        //     provide: 'Events_Service',
        //     useClass: EventsService,
        // },
    ]

})
export class EventsModule {}
