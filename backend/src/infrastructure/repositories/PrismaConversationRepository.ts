import { IConversationRepository } from "../../application/repositories/IConversationRepository";
import { Message } from "../ai/types/MessageType";
import { ConversationState } from "../ai/enums/ConversationStateEnum";
import { prisma } from "../database/prisma/prismaClient";
import { PrismaConversationMapper } from "../database/prisma/mappers/PrismaConversationMapper";

export class PrismaConversationRepository implements IConversationRepository {

  async create(): Promise<number> {
    const conversation = await prisma.conversation.create({
      data: {
        messages: [],
        state: ConversationState.COLLECTING
      }
    });
    return conversation.id;
  }

  async findById(id: number): Promise<{ messages: Message[]; state: ConversationState } | null> {
    const conversation = await prisma.conversation.findUnique({
      where: { id }
    });
    if (!conversation) return null;
    return PrismaConversationMapper.toDomain(conversation);
  }

  async update(id: number, messages: Message[], state?: ConversationState): Promise<void> {
    await prisma.conversation.update({
      where: { id },
      data: {
        messages: messages as any,
        ...(state && { state })
      }
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.conversation.delete({
      where: { id }
    });
  }
}