import { Message } from "../../infrastructure/ai/types/MessageType";
import { ConversationState } from "../../infrastructure/ai/enums/ConversationStateEnum";

export interface IConversationRepository {
  create(): Promise<number>;
  findById(id: number): Promise<{ messages: Message[]; state: ConversationState } | null>;
  update(id: number, messages: Message[], state?: ConversationState): Promise<void>;
  delete(id: number): Promise<void>;
}