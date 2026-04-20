import { EventInterpreter } from "../../../infrastructure/ai/groq/EventInterpreter";
import { InterpreterResponse } from "../../../infrastructure/ai/types/InterpreterResponse";
import { IConversationRepository } from "../../repositories/IConversationRepository";
import { DeleteEventUseCase } from "../event/deleteEventUseCase";
import { ConversationState } from "../../../infrastructure/ai/enums/ConversationStateEnum";

export class InterpretDeleteEventUseCase {

    private eventInterpreter: EventInterpreter;
    private deleteEventUseCase: DeleteEventUseCase;
    private conversationRepository: IConversationRepository;

    constructor(
        eventInterpreter: EventInterpreter,
        deleteEventUseCase: DeleteEventUseCase,
        conversationRepository: IConversationRepository
    ) {
        this.eventInterpreter = eventInterpreter;
        this.deleteEventUseCase = deleteEventUseCase;
        this.conversationRepository = conversationRepository;
    }

    async execute(userMessage: string, eventId: number, conversationId?: number): Promise<{result: InterpreterResponse, conversationId: number}> {
        const id = conversationId ?? await this.conversationRepository.create();

        const response = await this.eventInterpreter.interpret(userMessage, id);

        if (response.state === ConversationState.DONE) {
            await this.deleteEventUseCase.execute(eventId);
            await this.eventInterpreter.reset(id);
        }

        return { result: response, conversationId: id };
    }
}
