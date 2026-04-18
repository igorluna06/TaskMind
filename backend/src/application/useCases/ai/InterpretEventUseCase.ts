import { EventInterpreter } from "../../../infrastructure/ai/groq/EventInterpreter";
import { IConversationRepository } from "../../repositories/IConversationRepository";
import { CreateEventUseCase } from "../event/createEventUseCase";
import { InterpreterResponse } from "../../../infrastructure/ai/types/InterpreterResponse";
import { ConversationState } from "../../../infrastructure/ai/enums/ConversationStateEnum";
import { CreateEventDTO } from "../../dtos/event/createEventDTO";
import { AIParseError } from "../../../infrastructure/ai/error/AIParseError";

export class InterpretEventUseCase {

    private eventInterpreter: EventInterpreter;
    private createEventUseCase: CreateEventUseCase;
    private conversationRepository: IConversationRepository;

    constructor(
        eventInterpreter: EventInterpreter,
        createEventUseCase: CreateEventUseCase,
        conversationRepository: IConversationRepository
    ) {
        this.eventInterpreter = eventInterpreter;
        this.createEventUseCase = createEventUseCase;
        this.conversationRepository = conversationRepository;
    }

    async execute(userMessage: string, conversationId?: number): Promise<{result: InterpreterResponse, conversationId: number}>{
        const id = conversationId ?? await this.conversationRepository.create();

        const response = await this.eventInterpreter.interpret(userMessage, id);

        if (response.state === ConversationState.DONE) {

            const eventData= response.data;

            if (!eventData.title || !eventData.type || !eventData.description || !eventData.date || !eventData.time || !eventData.duration) {
                throw new AIParseError();
            }
            
            await this.createEventUseCase.execute(eventData as CreateEventDTO);
            await this.eventInterpreter.reset(id);
        }

        return { result: response, conversationId: id };
    }
  
}