import { InvalidEventIdError } from "../../../domain/errors/event/InvalidEventIdError";
import { IEventRepository } from "../../repositories/IEventRepository";
import { Event } from "../../../domain/entities/Event";
import { EventNotFoundError } from "../../../domain/errors/event/EventNotFoundError";

export class GetEventByIdUseCase {

    private eventRepository: IEventRepository;

    constructor(eventRepository: IEventRepository) {
        this.eventRepository = eventRepository;
    }

    async execute(eventId: number): Promise<Event> {

        if(!eventId || eventId <= 0) {
            throw new InvalidEventIdError();
        }

        const eventFound = await this.eventRepository.findById(eventId);

        if(!eventFound) {
            throw new EventNotFoundError();
        }

        return eventFound;
    }

}