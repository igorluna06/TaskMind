import { EventInterpreter } from "../../../infrastructure/ai/groq/EventInterpreter";
import { IConversationRepository } from "../../repositories/IConversationRepository";
import { FindEventsByFilterUseCase } from "../event/findEventsByFilterUseCase";
import { ListEventsUseCase } from "../event/listEventsUseCase";
import { InterpreterResponse } from "../../../infrastructure/ai/types/InterpreterResponse";
import { ConversationState } from "../../../infrastructure/ai/enums/ConversationStateEnum";
import { EventFilterDTO } from "../../dtos/event/eventFilterDTO";

export class InterpretFindEventUseCase {

    private eventInterpreter: EventInterpreter;
    private conversationRepository: IConversationRepository;
    private listEventsUseCase: ListEventsUseCase;
    private findEventsByFiltersUseCase: FindEventsByFilterUseCase;

    constructor(
        eventInterpreter: EventInterpreter,
        conversationRepository: IConversationRepository,
        listEventsUseCase: ListEventsUseCase,
        findEventsByFiltersUseCase: FindEventsByFilterUseCase
    ) {
        this.eventInterpreter = eventInterpreter;
        this.conversationRepository = conversationRepository;
        this.listEventsUseCase = listEventsUseCase;
        this.findEventsByFiltersUseCase = findEventsByFiltersUseCase;
    }

    async executeWithFilters(userMessage: string, filters: EventFilterDTO, conversationId?: number): Promise<{result: InterpreterResponse, conversationId: number}> {
        const id = conversationId ?? await this.conversationRepository.create();

        const initialResponse = await this.eventInterpreter.interpret(userMessage, id);

        if (initialResponse.state === ConversationState.SEARCHING) {
            const searchResults = await this.findEventsByFiltersUseCase.execute(filters);
            const response = await this.eventInterpreter.interpretWithResults(JSON.stringify(searchResults), id);

            if (response.state === ConversationState.DONE) {
                await this.eventInterpreter.reset(id);
            }

            return { result: response, conversationId: id };
        }

        if (initialResponse.state === ConversationState.DONE) {
            await this.eventInterpreter.reset(id);
        }

        return { result: initialResponse, conversationId: id };
    }

    async execute(userMessage: string, conversationId?: number): Promise<{result: InterpreterResponse, conversationId: number}> {
        const id = conversationId ?? await this.conversationRepository.create();

        const initialResponse = await this.eventInterpreter.interpret(userMessage, id);

        if (initialResponse.state === ConversationState.SEARCHING) {
            const allEvents = await this.listEventsUseCase.execute();
            const response = await this.eventInterpreter.interpretWithResults(JSON.stringify(allEvents), id);

            if (response.state === ConversationState.DONE) {
                await this.eventInterpreter.reset(id);
            }

            return { result: response, conversationId: id };
        }

        if (initialResponse.state === ConversationState.DONE) {
            await this.eventInterpreter.reset(id);
        }

        return { result: initialResponse, conversationId: id };
    }
}
