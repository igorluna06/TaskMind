import { IConversationRepository } from "../../../application/repositories/IConversationRepository";
import { ConversationState } from "../enums/ConversationStateEnum";
import { AIParseError } from "../error/AIParseError";
import { InvalidAIResponseError } from "../error/InvalidAIResponseError";
import { InterpreterResponse } from "../types/InterpreterResponse";
import { Message } from "../types/MessageType";
import { GroqModels } from "./constants/GroqModels";
import { MessageRole } from "./constants/MessageRole";
import { groq } from "./groqCliente";
import { EVENT_SYSTEM_PROMPT } from "./prompts/eventSystemPrompt";

export class EventInterpreter {
  constructor(private readonly conversationRepository: IConversationRepository) {}

    async interpret(userMessage: string, conversationId: number): Promise<InterpreterResponse> {
    
        const conversation = await this.conversationRepository.findById(conversationId);
        const history: Message[] = conversation?.messages ?? [];

        const updatedHistory : Message[] = [
        ...history,
        { role: MessageRole.USER, content: userMessage }
        ];

        const completion = await groq.chat.completions.create({
        model: GroqModels.EVENT_INTERPRETER,
        messages: [
            { role: MessageRole.SYSTEM, content: EVENT_SYSTEM_PROMPT },
            ...updatedHistory
        ],
        temperature: 0.3,
        });

        const content = completion.choices[0].message.content;

        if(!content) {
            throw new InvalidAIResponseError();
        }

        const finalHistory: Message[] = [...updatedHistory, { role: MessageRole.ASSISTANT, content }];

        try {
            const parsedContent: InterpreterResponse = JSON.parse(content);
            await this.conversationRepository.update(conversationId, finalHistory, parsedContent.state as ConversationState);
            return  parsedContent;
        } catch (error) {
            throw new AIParseError();
        }
    }

    async reset(conversationId: number): Promise<void> {
        await this.conversationRepository.delete(conversationId);
    }
}