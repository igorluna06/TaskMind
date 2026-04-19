import { InterpretCreateEventUseCase } from "../../../application/useCases/ai/InterpretCreateEventUseCase";
import { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "../../constants/HttpStatusCode";
import { InterpretEventDTO } from "../../../application/dtos/ai/InterpretEventDTO";

export class AIController {

    private interpretCreateEventUseCase: InterpretCreateEventUseCase;

    constructor(interpretCreateEventUseCase: InterpretCreateEventUseCase) {
        this.interpretCreateEventUseCase = interpretCreateEventUseCase;
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
}