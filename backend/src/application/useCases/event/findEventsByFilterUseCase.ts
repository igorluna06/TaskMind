import { IEventRepository } from "../../repositories/IEventRepository";
import { Event } from "../../../domain/entities/Event";
import { EventFilterDTO } from "../../dtos/event/eventFilterDTO";
import { FilterNotProvidedError } from "../../errors/FilterNotProvidedError";
import { EventType } from "../../../domain/enums/EventEnum/EventType";
import { InvalidEventTypeError } from "../../../domain/errors/event/InvalidEventTypeError";
import { EventStatus } from "../../../domain/enums/EventEnum/EventStatus";
import { InvalidEventStatusError } from "../../../domain/errors/event/InvalidEventStatusError";

export class FindEventsByFilterUseCase {

    private eventRepository: IEventRepository;

    constructor(eventRepository: IEventRepository) {
        this.eventRepository = eventRepository;
    }

    async execute(filter: EventFilterDTO): Promise<Event[]> {

        if(!filter || Object.values(filter).every(value => value === undefined || value === null)){
            throw new FilterNotProvidedError();
        }

        if(filter.type !== undefined){
            if(!Object.values(EventType).includes(filter.type)){
                throw new InvalidEventTypeError();
            }
        }

        if(filter.status !== undefined){
            if(!Object.values(EventStatus).includes(filter.status)){
                throw new InvalidEventStatusError();
            }
        }
        
        return this.eventRepository.findByFilter(filter);
    }
}