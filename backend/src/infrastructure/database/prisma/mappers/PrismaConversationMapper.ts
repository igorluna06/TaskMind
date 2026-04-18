import { Message } from "../../../ai/types/MessageType";
import { ConversationState } from "../../../ai/enums/ConversationStateEnum";

export class PrismaConversationMapper {
  static toDomain(raw: any): { messages: Message[]; state: ConversationState } {
    return {
      messages: raw.messages as Message[],
      state: raw.state as ConversationState
    };
  }
}