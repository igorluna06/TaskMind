import { InterpretCreateEventUseCase } from "../../../application/useCases/ai/InterpretCreateEventUseCase";
import { InterpretFindEventUseCase } from "../../../application/useCases/ai/InterpretFindEventUseCase";
import { InterpretUpdateEventUseCase } from "../../../application/useCases/ai/InterpretUpdateEventUseCase";
import { InterpretDeleteEventUseCase } from "../../../application/useCases/ai/InterpretDeleteEventUseCase";
import { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "../../constants/HttpStatusCode";
import { InterpretEventDTO } from "../../../application/dtos/ai/InterpretEventDTO";
import { EventFilterDTO } from "../../../application/dtos/event/eventFilterDTO";

export class AIController {

    private interpretCreateEventUseCase: InterpretCreateEventUseCase;
    private interpretFindEventUseCase: InterpretFindEventUseCase;
    private interpretUpdateEventUseCase: InterpretUpdateEventUseCase;
    private interpretDeleteEventUseCase: InterpretDeleteEventUseCase;

    constructor(
        interpretCreateEventUseCase: InterpretCreateEventUseCase,
        interpretFindEventUseCase: InterpretFindEventUseCase,
        interpretUpdateEventUseCase: InterpretUpdateEventUseCase,
        interpretDeleteEventUseCase: InterpretDeleteEventUseCase
    ) {
        this.interpretCreateEventUseCase = interpretCreateEventUseCase;
        this.interpretFindEventUseCase = interpretFindEventUseCase;
        this.interpretUpdateEventUseCase = interpretUpdateEventUseCase;
        this.interpretDeleteEventUseCase = interpretDeleteEventUseCase;
    }


    async interpretCreateEvent(req: Request, res: Response, next: NextFunction) {
        try {
            const interpretData: InterpretEventDTO = req.body;
            const result = await this.interpretCreateEventUseCase.execute(interpretData.message, interpretData.conversationId);
            res.status(HttpStatusCode.OK).json(result);
        } catch (error) {
            next(error);
        }
    }

    async interpretFindEvent(req: Request, res: Response, next: NextFunction) {
        try {
            const interpretData: InterpretEventDTO = req.body;
            const result = await this.interpretFindEventUseCase.execute(interpretData.message, interpretData.conversationId);
            res.status(HttpStatusCode.OK).json(result);
        } catch (error) {
            next(error);
        }
    }

    async interpretFindEventWithFilters(req: Request, res: Response, next: NextFunction) {
        try {
            const interpretData: InterpretEventDTO = req.body;
            const filters: EventFilterDTO = req.query as EventFilterDTO;
            const result = await this.interpretFindEventUseCase.executeWithFilters(interpretData.message, filters, interpretData.conversationId);
            res.status(HttpStatusCode.OK).json(result);
        } catch (error) {
            next(error);
        }
    }

    async interpretUpdateEvent(req: Request, res: Response, next: NextFunction) {
        try {
            const eventId: number = Number(req.params.id);
            const interpretData: InterpretEventDTO = req.body;
            const result = await this.interpretUpdateEventUseCase.execute(interpretData.message, eventId, interpretData.conversationId);
            res.status(HttpStatusCode.OK).json(result);
        } catch (error) {
            next(error);
        }
    }

    async interpretDeleteEvent(req: Request, res: Response, next: NextFunction) {
        try {
            const eventId: number = Number(req.params.id);
            const interpretData: InterpretEventDTO = req.body;
            const result = await this.interpretDeleteEventUseCase.execute(interpretData.message, eventId, interpretData.conversationId);
            res.status(HttpStatusCode.OK).json(result);
        } catch (error) {
            next(error);
        }
    }
}
