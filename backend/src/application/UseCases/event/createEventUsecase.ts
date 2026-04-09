import { CreateEventDTO } from "../../dtos/event/createEventDTO";
import { Event } from "../../../domain/entities/Event";
import { MissingRequiredFieldsError } from "./errors/MissingRequiredFieldsError";
import { InvalidEventDurationError } from "../../../domain/errors/EventErrors/InvalidEventDurationError";
import { InvalidEventScheduleError } from "../../../domain/errors/EventErrors/InvalidEventScheduleError";
import { InvalidCreateEventDateError } from "./errors/InvalidCreateEventDateError";
import { InvalidCreateEventTimeError } from "./errors/InvalidCreateEventTimeError";
import { IEventRepository } from "../../repositories/IEventRepository";

export class CreateEventUseCase {

    private eventRepository : IEventRepository;

    constructor(eventRepository : IEventRepository) {
        this.eventRepository = eventRepository;
    }

    execute(eventData: CreateEventDTO){
        if(!eventData.title || !eventData.type || !eventData.date || !eventData.time || !eventData.description || eventData.isRecurring === undefined || !eventData.notificationTiming){
            throw new MissingRequiredFieldsError();
        }

        if(!eventData.duration || isNaN(eventData.duration)){
            throw new InvalidEventDurationError();
        }

        const formatDateValid = /^\d{4}-\d{2}-\d{2}$/;
        const isValidDate = (data : string) => {
            const [year, month, day] = data.split('-').map(Number);
            const date = new Date(year, month - 1, day);
            return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
        }

        if(!formatDateValid.test(eventData.date) || !isValidDate(eventData.date)){
            throw new InvalidCreateEventDateError();
        }

        const timeRegex = /^([0-1]\d|2[0-3]):([0-5]\d)$/;

        if(eventData.time.length != 5 || eventData.time[2] != ':' || !timeRegex.test(eventData.time)){
            throw new InvalidCreateEventTimeError();
        }

        const dateTime = new Date(`${eventData.date}T${eventData.time}`);

        if(dateTime < new Date()){
            throw new InvalidEventScheduleError();
        }

        const newEvent = this.eventRepository.create(new Event(
            eventData.title,
            eventData.type,
            eventData.description,
            dateTime,
            eventData.duration,
            eventData.isRecurring,
            eventData.notificationTiming
        ));

        return newEvent;

    }
}