import { eventService, type EventDTO } from "../../../infrastructure/http/services/eventService";
import type { Event } from "../../../domain/entities/Event";

export async function createEventUseCase(data: EventDTO): Promise<Event> {
  return eventService.create(data);
}