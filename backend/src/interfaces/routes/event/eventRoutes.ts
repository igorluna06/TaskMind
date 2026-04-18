import { Router } from "express";
import { EventController } from "../../controllers/event/EventController";
import { CreateEventUseCase } from "../../../application/useCases/event/createEventUseCase";
import { DeleteEventUseCase } from "../../../application/useCases/event/deleteEventUseCase";
import { FindEventsByFilterUseCase } from "../../../application/useCases/event/findEventsByFilterUseCase";
import { GetEventByIdUseCase } from "../../../application/useCases/event/getEventByIdUseCase";
import { ListEventsUseCase } from "../../../application/useCases/event/listEventsUseCase";
import { UpdateEventUseCase } from "../../../application/useCases/event/updateEventUseCase";
import { PrismaEventRepository } from "../../../infrastructure/repositories/PrismaEventRepository";
import { EventEndpoints } from "./eventEndpoints";

const router = Router();

const eventRepository = new PrismaEventRepository();

const createEventUseCase = new CreateEventUseCase(eventRepository);
const getEventByIdUseCase = new GetEventByIdUseCase(eventRepository);
const updateEventUseCase = new UpdateEventUseCase(eventRepository);
const findEventsByFilterUseCase = new FindEventsByFilterUseCase(eventRepository);
const deleteEventUseCase = new DeleteEventUseCase(eventRepository);
const listEventsUseCase = new ListEventsUseCase(eventRepository);

const eventController = new EventController(
    createEventUseCase,
    getEventByIdUseCase,
    updateEventUseCase,
    findEventsByFilterUseCase,
    deleteEventUseCase,
    listEventsUseCase
);

router.post(EventEndpoints.ROOT, (req, res, next) => eventController.createEvent(req, res, next));
router.get(EventEndpoints.ROOT,(req, res, next) => eventController.listEvents(req, res, next));
router.get(EventEndpoints.FILTER, (req, res, next) => eventController.findEventsByFilter(req, res, next));
router.get(EventEndpoints.BY_ID, (req, res, next) => eventController.getEventById(req, res, next));
router.put(EventEndpoints.BY_ID, (req, res, next) => eventController.updateEvent(req, res, next));
router.delete(EventEndpoints.BY_ID, (req, res, next) => eventController.deleteEvent(req, res, next));

export default router;