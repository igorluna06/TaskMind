import { Event } from "../../domain/entities/Event";
import { EventFilterDTO } from "../dtos/event/eventFilterDTO";
export interface IEventRepository {
    create(event: Event): Promise<Event>;
    findById(id: number): Promise<Event | null>;
    update(event: Event): Promise<Event | null>;
    delete(id: number): Promise<void>;
    findByFilter(filter: EventFilterDTO): Promise<Event[]>;
    findAll(): Promise<Event[]>;
}