import { eventService } from "../../../infrastructure/http/services/eventService";
import type { Event } from "../../../domain/entities/Event";

export async function getEventsUseCase(): Promise<Event[]> {
  return eventService.getAll();
}