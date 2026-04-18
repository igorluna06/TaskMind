import { CreateEventDTO } from "../../dtos/event/createEventDTO";
import { Event } from "../../../domain/entities/Event";
import { MissingRequiredFieldsError } from "../../errors/MissingRequiredFieldsError";
import { InvalidEventDurationError } from "../../../domain/errors/event/InvalidEventDurationError";
import { InvalidEventScheduleError } from "../../../domain/errors/event/InvalidEventScheduleError";
import { InvalidEventDateError } from "../../../domain/errors/event/InvalidEventDateError";
import { InvalidEventTimeError } from "../../../domain/errors/event/InvalidEventTimeError";
import { IEventRepository } from "../../repositories/IEventRepository";
import { isValidDate } from "../../../utils/date/validations/isValidDate";
import { isValidTime } from "../../../utils/date/validations/isValidTime";
import { buildDateTime } from "../../../utils/date/format/buildDateTime";

export class CreateEventUseCase {

    private eventRepository : IEventRepository;

    constructor(eventRepository : IEventRepository) {
        this.eventRepository = eventRepository;
    }

    async execute(eventData: CreateEventDTO): Promise<Event> {
        if(!eventData.title || !eventData.type || !eventData.date || !eventData.time || !eventData.description){
            throw new MissingRequiredFieldsError();
        }

        if(!eventData.duration || isNaN(eventData.duration)){
            throw new InvalidEventDurationError();
        }

        if(!isValidDate(eventData.date)){
            throw new InvalidEventDateError();
        }

        if(!isValidTime(eventData.time)){
            throw new InvalidEventTimeError();
        }

        const dateTime = buildDateTime(eventData.date, eventData.time);

        if(dateTime < new Date()){
            throw new InvalidEventScheduleError();
        }

        const newEvent = await this.eventRepository.create(new Event(
            eventData.title,
            eventData.type,
            eventData.description,
            dateTime,
            eventData.duration,
        ));

        return newEvent;

    }
}