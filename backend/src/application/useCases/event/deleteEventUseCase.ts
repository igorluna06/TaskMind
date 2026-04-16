import { IEventRepository } from "../../repositories/IEventRepository";
import { Event } from "../../../domain/entities/Event";
import { EventStatus } from "../../../domain/enums/EventEnum/EventStatus";
import { EventNotFoundError } from "../../../domain/errors/event/EventNotFoundError";
import { InvalidEventIdError } from "../../../domain/errors/event/InvalidEventIdError";
import { EventCannotBeDeletedError } from "../../../domain/errors/event/EventCannotBeDeletedError";

export class DeleteEventUseCase {
    
    private eventRepository : IEventRepository;

    constructor(eventRepository : IEventRepository) {
        this.eventRepository = eventRepository;
    }

    async execute(eventId: number): Promise<void> {

        if(!eventId || eventId <= 0){
            throw new InvalidEventIdError();
        }

        const eventFound: Event | null = await this.eventRepository.findById(eventId);

        if(!eventFound){
            throw new EventNotFoundError();
        }

        if(eventFound.getStatus() !== EventStatus.PENDING){
            throw new EventCannotBeDeletedError();
        }

        await this.eventRepository.delete(eventId);
    }

}