import { Event } from "../../domain/entities/Event";
export interface IEventRepository {
    create(event: Event): Promise<Event>;
    findById(id: number): Promise<Event | null>;
    update(event: Event): Promise<Event | null>;
    delete(id: number): Promise<void>;
    findAll(): Promise<Event[]>;
}