import { Body, ClassSerializerInterceptor, Controller, Delete, ForbiddenException, Get, HttpCode, Inject, Logger, NotFoundException, Param, ParseIntPipe, Patch, Post, Query, SerializeOptions, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthGuardJwt } from "src/auth/auth-guard.jwt";
import { CurrentUser } from "src/auth/current-user.decorator";
import { Like, MoreThan, Repository } from "typeorm";
import { Attendee } from "./attendee.entity";
import { CreateEventDto } from "./input/create-event.dto";
import { Event } from "./event.entity";
import { EventsService } from "./events.service";
import { UpdateEventDto } from "./update-event.dto";
import { ListEvents } from "./input/lists.events";
import { User } from "src/auth/user.entity";

@Controller('/events')
@SerializeOptions({ strategy: 'excludeAll'})
export class EventsController{
    private readonly logger = new Logger(EventsController.name)
   
    constructor(
    private readonly eventsService: EventsService,
    // @InjectRepository(Event)
    // private readonly repository: Repository<Event>,
    // @InjectRepository(Attendee)
    // private readonly attendeerepository: Repository<Attendee>
   ){}
    
    @Get()
    @UsePipes(new ValidationPipe({ transform: true}))
    @UseInterceptors(ClassSerializerInterceptor)
    async findAll(@Query() filter: ListEvents){
        this.logger.log(`Hit the findall route`);
        const events = await this.eventsService
        .getEventsWithAttendeeCountFilteredPaginated(
            filter,
            {
                total: true,
                currentPage: filter.page,
                limit: 10
            }
        );
        return events;
    }

    @Get('/practice')
    async practice(){
        // return await this.repository.find({
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
        // });
    }

    @Get('practice2')
    async practice2(){
        // // return await this.repository.findOne(
        // //     {
        // //     relations: ['attendees'],
        // //     where: 
        // //     {
        // //         id: 1,
        // //     },     
        // // });
        // const event = await this.repository.findOne({
        //     where: { id: 1}, 
        //     relations: ['attendees']  
        // });

        //     // const event = new Event();
        //     // event.id =1;

        // const attendee = new Attendee();
        // attendee.name = 'Using Cascade';
        // attendee.event = event;

        // event.attendees.push(attendee);
        // // await this.attendeerepository.save(attendee);
        // await this.repository.save(event)
        //     return event;
       
        // return await this.repository.createQueryBuilder('e')
        // .select(['e.id', 'e.name'])
        // .orderBy('e.id', 'ASC')
        // .take(3)
        // .getMany();
    }

    @Get(':id')
    @UseInterceptors(ClassSerializerInterceptor)
    async findOne(@Param('id', ParseIntPipe) id: number){
        // console.log(typeof id);
    //    const event = await this.repository.findOne({
    //     where:{
    //         id: id
    //     }});

    const event = await this.eventsService.getEventWithAttendeeCount(
        // {
        // where:{
            id
    //     }
    // }
        );
       if (!event) {
        throw new NotFoundException();
       }
       return event;
    }

    @Post() 
    @UseGuards(AuthGuardJwt)
    @UseInterceptors(ClassSerializerInterceptor)
    async create(
        @Body() input: CreateEventDto,
        @CurrentUser() user: User
         ){
            console.log( input, user)
        return await this.eventsService.createEvent(input,user ) 
    }

    // Create new ValidationPpipe to specify validation group inside @Body
    //  new ValidationPipe({ groups: ['update']})
    @Patch(':id')
    @UseGuards(AuthGuardJwt)
    @UseInterceptors(ClassSerializerInterceptor)
    async update(
        @Param('id', ParseIntPipe) id, 
        @Body() input: UpdateEventDto,
        @CurrentUser() user: User
        ){
        const event = await this.eventsService.findOne(id);
       
       if (!event) {
        throw new NotFoundException();
       }

       if (event.organizerId !== user.id){
        throw new ForbiddenException(
            null, `You are not authorized to change this event`
        );
       }

       return await this.eventsService.updateEvent(event, input);
    }

    @Delete(':id')
    @UseGuards(AuthGuardJwt)
    @HttpCode(204)
    async remove(
        @Param('id', ParseIntPipe) id,
        @CurrentUser() user: User
    ){
       const event = await this.eventsService.findOne(id);
       
       if (!event) {
        throw new NotFoundException();
       }
       if (event.organizerId !== user.id){
        throw new ForbiddenException(
            null, `You are not authorized to remove this event`
        );
       }
       const result = await this.eventsService.deleteEvent(id);

    }
    // @Delete(':id')
    // @HttpCode(204)
    // async remove(
    //     @Param('id') id,
    //     @CurrentUser() user: User
    //     ){
    //    const result = await this.eventsService.deleteEvent(id);
    //    if (result?.affected !== 1) {
    //     throw new NotFoundException();
    //    }
    // }
}   