import { Body, ClassSerializerInterceptor, Controller, Get, NotFoundException, Param, ParseIntPipe, Put, Query, SerializeOptions, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuardJwt } from "src/auth/auth-guard.jwt";
import { CurrentUser } from "src/auth/current-user.decorator";
import { User } from "src/auth/user.entity";
import { AttendeesService } from "./attendees.service";
import { EventsService } from "./events.service";
import { CreateAttendeedto } from "./input/create-attendee.dto";

@Controller('events-attendance')
@SerializeOptions({ strategy: 'excludeAll'})
export class CurrentUserEventAttendanceController{
    constructor(
        private readonly eventService: EventsService,
        private readonly attendanceService: AttendeesService 
    ){}

    @Get()
    @UseGuards(AuthGuardJwt)
    @UseInterceptors(ClassSerializerInterceptor)
    async findAll(
        @CurrentUser() user:User,
        @Query('page', ParseIntPipe) page = 1
    ){
        return await this.eventService
        .getEventsAttendedByUserIdPaginated(
            user.id, { limit: 6, currentPage: page}
        );
    }

    @Get(':/eventId')
    @UseGuards(AuthGuardJwt)
    @UseInterceptors(ClassSerializerInterceptor)
    async findOne(
        @Param('eventId', ParseIntPipe) evenntId: number,
        @CurrentUser() user:User
    ){
        const attendee = await this.attendanceService
        .findOneByEventIdAndUserId(
            evenntId, user.id);

            if(!attendee){
                throw new NotFoundException();
            }

            return attendee;
    }

    @Put(':/eventId')
    @UseGuards(AuthGuardJwt)
    @UseInterceptors(ClassSerializerInterceptor)
    async createOrUpdate(@Param('eventId', ParseIntPipe) eventId: number,
    @Body() input: CreateAttendeedto,
    @CurrentUser() user: User){
    return this.attendanceService.createOrUpdate(input, eventId, user.id)
    };
}