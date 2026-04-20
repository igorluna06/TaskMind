import { Router } from "express";
import { AIController } from "../../controllers/ai/AIController";
import { InterpretCreateEventUseCase } from "../../../application/useCases/ai/InterpretCreateEventUseCase";
import { EventInterpreter } from "../../../infrastructure/ai/groq/EventInterpreter";
import { PrismaConversationRepository } from "../../../infrastructure/repositories/PrismaConversationRepository";
import { PrismaEventRepository } from "../../../infrastructure/repositories/PrismaEventRepository";
import { CreateEventUseCase } from "../../../application/useCases/event/createEventUseCase";
import { AIEndpoints } from "./aiEndpoints";
import { DeleteEventUseCase } from "../../../application/useCases/event/deleteEventUseCase";
import { InterpretDeleteEventUseCase } from "../../../application/useCases/ai/InterpretDeleteEventUseCase";
import { InterpretFindEventUseCase } from "../../../application/useCases/ai/InterpretFindEventUseCase";
import { InterpretUpdateEventUseCase } from "../../../application/useCases/ai/InterpretUpdateEventUseCase";
import { FindEventsByFilterUseCase } from "../../../application/useCases/event/findEventsByFilterUseCase";
import { ListEventsUseCase } from "../../../application/useCases/event/listEventsUseCase";
import { UpdateEventUseCase } from "../../../application/useCases/event/updateEventUseCase";

const router = Router();

const conversationRepository = new PrismaConversationRepository();
const eventRepository = new PrismaEventRepository();
const createEventUseCase = new CreateEventUseCase(eventRepository);
const updateEventUseCase = new UpdateEventUseCase(eventRepository);
const deleteEventUseCase = new DeleteEventUseCase(eventRepository);
const findEventsByFilterUseCase = new FindEventsByFilterUseCase(eventRepository);
const listEventsUseCase = new ListEventsUseCase(eventRepository);
const eventInterpreter = new EventInterpreter(conversationRepository);
const interpretCreateEventUseCase = new InterpretCreateEventUseCase(eventInterpreter, createEventUseCase, conversationRepository);
const interpretFindEventUseCase = new InterpretFindEventUseCase(eventInterpreter, conversationRepository, listEventsUseCase, findEventsByFilterUseCase);
const interpretUpdateEventUseCase = new InterpretUpdateEventUseCase(eventInterpreter, updateEventUseCase, conversationRepository);
const interpretDeleteEventUseCase = new InterpretDeleteEventUseCase(eventInterpreter, deleteEventUseCase, conversationRepository);
const aiController = new AIController(
    interpretCreateEventUseCase,
    interpretFindEventUseCase,
    interpretUpdateEventUseCase,
    interpretDeleteEventUseCase
);

router.post(AIEndpoints.CREATE, (req, res, next) => aiController.interpretCreateEvent(req, res, next));
router.post(AIEndpoints.FIND, (req, res, next) => aiController.interpretFindEvent(req, res, next));
router.post(AIEndpoints.FIND_FILTER, (req, res, next) => aiController.interpretFindEventWithFilters(req, res, next));
router.post(AIEndpoints.UPDATE, (req, res, next) => aiController.interpretUpdateEvent(req, res, next));
router.post(AIEndpoints.DELETE, (req, res, next) => aiController.interpretDeleteEvent(req, res, next));

export default router;