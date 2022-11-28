import { IsEnum } from "class-validator";
import { AttendeeAnswerEnum } from "../attendee.entity";

export class CreateAttendeedto{
    @IsEnum(AttendeeAnswerEnum)
    answer: AttendeeAnswerEnum;
}