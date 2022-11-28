import { PartialType } from "@nestjs/mapped-types";
import { CreateEventDto } from "./input/create-event.dto";
 
export class UpdateEventDto extends PartialType(CreateEventDto){
 
}