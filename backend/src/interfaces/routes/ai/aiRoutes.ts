import { Router } from "express";
import { AIController } from "../../controllers/ai/AIController";
import { InterpretCreateEventUseCase } from "../../../application/useCases/ai/InterpretCreateEventUseCase";
import { EventInterpreter } from "../../../infrastructure/ai/groq/EventInterpreter";
import { PrismaConversationRepository } from "../../../infrastructure/repositories/PrismaConversationRepository";
import { PrismaEventRepository } from "../../../infrastructure/repositories/PrismaEventRepository";
import { CreateEventUseCase } from "../../../application/useCases/event/createEventUseCase";
import { AIEndpoints } from "./aiEndpoints";

const router = Router();

const conversationRepository = new PrismaConversationRepository();
const eventRepository = new PrismaEventRepository();
const createEventUseCase = new CreateEventUseCase(eventRepository);
const eventInterpreter = new EventInterpreter(conversationRepository);
const interpretCreateEventUseCase = new InterpretCreateEventUseCase(eventInterpreter, createEventUseCase, conversationRepository);
const aiController = new AIController(interpretCreateEventUseCase);

router.post(AIEndpoints.INTERPRET, (req, res, next) => aiController.interpretCreateEvent(req, res, next));

export default router;