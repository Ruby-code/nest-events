import { Body, Controller, Delete, Get, HttpCode, Inject, Logger, NotFoundException, Param, ParseIntPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthGuardJwt } from "src/auth/auth-guard.jwt";
import { CurrentUser } from "src/auth/current-user.decorator";
import { User } from "src/auth/user.entity";
import { Like, MoreThan, Repository } from "typeorm";
import { Attendee } from "./attendee.entity";
import { CreateEventDto } from "./create-event.dto";
import { Event } from "./event.entity";
import { EventsService } from "./events.service";
import { UpdateEventDto } from "./update-event.dto";

@Controller('/events')
export class EventsController{
    private readonly logger = new Logger(EventsController.name)
   
    constructor(
    private readonly eventsService: EventsService,
    @InjectRepository(Event)
    private readonly repository: Repository<Event>,
    @InjectRepository(Attendee)
    private readonly attendeerepository: Repository<Attendee>
   ){}
    
    @Get()
    async findAll(){
        this.logger.log(`Hit the findall route`);
        const events = await this.repository.find();
        this .logger.debug(`Found ${events.length} events`);
        return events;
    }

    @Get('/practice')
    async practice(){
        return await this.repository.find({
            // select: ['id', 'when'],
            // where: [{
            //     id: MoreThan (3),
            //     when: MoreThan(new Date('2021-02-12T13:00:00'))},{
            // description: Like('%meet%')
            //     }],
            // take: 2,
            // order: {
            //     id: 'DESC'
            // }
        });
    }

    @Get('practice2')
    async practice2(){
        return await this.repository.findOne(
            {
            relations: ['attendees'],
            where: 
            {
                id: 1,
            },     
        });
        const event = await this.repository.findOne({
            where: { id: 1}, 
            relations: ['attendees']  })
        const attendee = new Attendee();
        attendee.name = 'Using Cascade';
        attendee.event = event;

        event.attendees.push(attendee);
        await this.attendeerepository.save(attendee);
        await this.repository.save(event)
            return event;
    }

    @Get(':id')
    async findOne(@Param('id') id){
        // console.log(typeof id);
       const event = await this.repository.findOne({
        where:{
            id: id
        }});

       if (!event) {
        throw new NotFoundException();
       }
       return event;
    }

    @Post() 
    @UseGuards(AuthGuardJwt)
    async create(
        @Body() input: CreateEventDto,
        @CurrentUser() user: User
         ){
        return await this.eventsService.createEvent(input, user )
    }

    @Patch(':id')
    async update(@Param('id') id, @Body() input: UpdateEventDto ){
       const event = await this.repository.findOne(id);
       if (!event) {
        throw new NotFoundException();
       }
       return await this.repository.save({ 
        ...event,
        ...input, 
       when: input.when ? new Date(input.when):  event.when
       })
    }

    @Delete(':id')
    @HttpCode(204)
    async remove(@Param('id') id){
       const event = await this.repository.findOne(id);
       if (!event) {
        throw new NotFoundException();
       }
       await this.repository.remove(event);
    }
}   