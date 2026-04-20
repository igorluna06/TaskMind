import { eventService, type EventDTO } from "../../../infrastructure/http/services/eventService";

export async function updateEventUseCase(id: number, data: Partial<EventDTO>) {
  return eventService.update(id, data);
}