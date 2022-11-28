import { ClassSerializerInterceptor, Controller, Get, Param, ParseIntPipe, Post, UseInterceptors } from "@nestjs/common";
import { AttendeesService } from "./attendees.service";

@Controller('events/:eventId/attendees')
export class EventAttendeesController{
    constructor(private readonly attendeesService: AttendeesService){}

    @Get()
    @UseInterceptors(ClassSerializerInterceptor)
    async fndAll(@Param('eventId', ParseIntPipe) eventId: number){
        return await this.attendeesService.findByEventId(eventId);

    }
}