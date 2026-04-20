import { aiService } from "../../../infrastructure/http/services/aiService";

export async function interpretCreateEventUseCase(message: string, conversationId?: number) {
  return aiService.interpretCreate(message, conversationId);
}

export async function interpretFindEventUseCase(message: string, conversationId?: number) {
  return aiService.interpretFind(message, conversationId);
}

export async function interpretUpdateEventUseCase(message: string, conversationId?: number) {
  return aiService.interpretUpdate(message, conversationId);
}

export async function interpretDeleteEventUseCase(message: string, conversationId?: number) {
  return aiService.interpretDelete(message, conversationId);
}