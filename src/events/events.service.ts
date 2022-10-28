import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/auth/user.entity";
import { DeleteResult, Repository } from "typeorm";
import { CreateEventDto } from "./create-event.dto";
import { Event } from "./event.entity";

export class EventsService{
constructor(@InjectRepository(Event) private readonly eventsRepository: Repository<Event>){}
    

private getEventsBaseQuery(){
    return this.eventsRepository
    .createQueryBuilder('e')
    .orderBy('e.id', 'DESC');
}

public async getEVent(id: number): Promise<Event>{
    return await this.getEventsBaseQuery()
    .andWhere('e.id = :id', {id}) 
    .getOne();
}

public async createEvent(input: CreateEventDto, user: User): Promise<Event>{
    return await this.eventsRepository.save({
        ...input,
        organizer: user,
        when: new Date(input.when)
    })
}

public async deleteEvent(id: number): Promise<DeleteResult>{
    return await this.eventsRepository
    .createQueryBuilder('e')
    .delete()
    .where('id=id', { id })
    .execute();
}
}