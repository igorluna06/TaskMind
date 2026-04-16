import { IEventRepository } from "../../repositories/IEventRepository";
import { Event } from "../../../domain/entities/Event";

export class ListEventsUseCase {

    private eventRepository: IEventRepository;

    constructor(eventRepository: IEventRepository) {
        this.eventRepository = eventRepository;
    }

    async execute(): Promise<Event[]> {

        return this.eventRepository.findAll();
    }

}