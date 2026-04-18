import { InterpretEventUseCase } from "../../../application/useCases/ai/InterpretEventUseCase";
import { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "../../constants/HttpStatusCode";
import { InterpretEventDTO } from "../../../application/dtos/ai/InterpretEventDTO";

export class AIController {

    private interpretEventUseCase: InterpretEventUseCase;

    constructor(interpretEventUseCase: InterpretEventUseCase) {
        this.interpretEventUseCase = interpretEventUseCase;
    }

    async interpretEvent(req: Request, res: Response, next: NextFunction) {
        try {
            const interpretData: InterpretEventDTO = req.body;

            const result = await this.interpretEventUseCase.execute(interpretData.message, interpretData.conversationId);

            res.status(HttpStatusCode.OK).json(result);
        } catch (error) {
            next(error);
        }
    }
}