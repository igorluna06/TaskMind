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
        return this.sendMessage(conversationId, userMessage);
    }

    async interpretWithResults(searchResults: string, conversationId: number): Promise<InterpreterResponse> {
        const content = searchResults;
        return this.sendMessage(conversationId, content);
    }

    async reset(conversationId: number): Promise<void> {
        await this.conversationRepository.delete(conversationId);
    }

    private async sendMessage(conversationId: number, content: string): Promise<InterpreterResponse> {
        const conversation = await this.conversationRepository.findById(conversationId);
        const history: Message[] = conversation?.messages ?? [];

        const updatedHistory: Message[] = [
            ...history,
            { role: MessageRole.USER, content}
        ];

        const completion = await groq.chat.completions.create({
            model: GroqModels.EVENT_INTERPRETER,
            messages: [
            { role: MessageRole.SYSTEM, content: EVENT_SYSTEM_PROMPT },
            ...updatedHistory
            ],
            temperature: 0.3,
        });

        const responseContent = completion.choices[0].message.content;

        if (!responseContent) {
            throw new InvalidAIResponseError();
        }

        const finalHistory: Message[] = [...updatedHistory, { role: MessageRole.ASSISTANT, content: responseContent }];

        try {
            console.log("Resposta bruta da IA:", responseContent);
            const parsedContent: InterpreterResponse = JSON.parse(responseContent);
            console.log("Parse OK:", parsedContent);
            await this.conversationRepository.update(conversationId, finalHistory, parsedContent.state as ConversationState);
            return parsedContent;
        } catch (error) {
            console.error("Erro real:", error);
            throw new AIParseError();
        }
    }
}