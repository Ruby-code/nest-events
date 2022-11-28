import { ClassSerializerInterceptor, Controller, Get, Param, ParseIntPipe, Query, UseInterceptors } from "@nestjs/common";
import { get } from "http";
import { EventsService } from "./events.service";

@Controller('events-organized-by-user/:userId')
export class EventsOrganizedByUserController{
    constructor(
        private readonly eventsService: EventsService
        ){}

        @Get()
        @UseInterceptors(ClassSerializerInterceptor)
        async findAll(
            @Param('uerId', ParseIntPipe) userId: number,
            @Query('page', ParseIntPipe) page = 1
        ){
            return await this.eventsService
            .getEventsOrganizedByUserIdPaginated(
                userId,
                { currentPage: page, limit: 5}
            );
        }
}
