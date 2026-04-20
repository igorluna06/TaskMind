import { eventService } from "../../../infrastructure/http/services/eventService";

export async function deleteEventUseCase(id: number): Promise<void> {
  return eventService.delete(id);
}