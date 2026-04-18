import {NextFunction, Request, Response} from "express";
import { CreateEventUseCase } from "../../../application/useCases/event/createEventUseCase";
import { ListEventsUseCase } from "../../../application/useCases/event/listEventsUseCase";
import { GetEventByIdUseCase } from "../../../application/useCases/event/getEventByIdUseCase";
import { UpdateEventUseCase } from "../../../application/useCases/event/updateEventUseCase";
import { FindEventsByFilterUseCase } from "../../../application/useCases/event/findEventsByFilterUseCase";
import { DeleteEventUseCase } from "../../../application/useCases/event/deleteEventUseCase";
import { CreateEventDTO } from "../../../application/dtos/event/createEventDTO";
import { UpdateDataDTO} from "../../../application/dtos/event/updateEventDTO";
import { EventFilterDTO } from "../../../application/dtos/event/eventFilterDTO";
import { SuccessMessages } from "../../constants/SucessMessages";
import { HttpStatusCode } from "../../constants/HttpStatusCode";




export class EventController {
    
    private createEventUseCase: CreateEventUseCase;
    private getEventByIdUseCase: GetEventByIdUseCase;
    private updateEventUseCase: UpdateEventUseCase;
    private findEventsByFilterUseCase: FindEventsByFilterUseCase;
    private deleteEventUseCase: DeleteEventUseCase;
    private listEventsUseCase: ListEventsUseCase;

    constructor(
        createEventUseCase: CreateEventUseCase,
        getEventByIdUseCase: GetEventByIdUseCase,
        updateEventUseCase: UpdateEventUseCase,
        findEventsByFilterUseCase: FindEventsByFilterUseCase,
        deleteEventUseCase: DeleteEventUseCase,
        listEventsUseCase: ListEventsUseCase
    ) {
        this.createEventUseCase = createEventUseCase;
        this.getEventByIdUseCase = getEventByIdUseCase;
        this.updateEventUseCase = updateEventUseCase;
        this.findEventsByFilterUseCase = findEventsByFilterUseCase;
        this.deleteEventUseCase = deleteEventUseCase;
        this.listEventsUseCase = listEventsUseCase;
    }

    async createEvent(req: Request, res: Response, next: NextFunction): Promise<void> {

        try{
            const eventData: CreateEventDTO = req.body;
            const newEvent = await this.createEventUseCase.execute(eventData);
            res.status(HttpStatusCode.CREATED).json(newEvent);
        } catch (error) {
            next(error);
        }
    }
        
    async getEventById(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {
            const eventId: number = Number(req.params.id);
            const event = await this.getEventByIdUseCase.execute(eventId);
            res.status(HttpStatusCode.OK).json(event);
        } catch (error) {
            next(error);
        }
    }
    
    async updateEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const eventId: number = Number(req.params.id);
            const updatedData: UpdateDataDTO = req.body;
            const updatedEvent = await this.updateEventUseCase.execute(eventId, updatedData);
            res.status(HttpStatusCode.OK).json(updatedEvent);
        } catch (error) {
            next(error);
        }
    }

    async findEventsByFilter(req: Request, res: Response, next: NextFunction): Promise<void> {

        try{
            const filter: EventFilterDTO = req.query; 
            const events = await this.findEventsByFilterUseCase.execute(filter);
            res.status(HttpStatusCode.OK).json(events);
        } catch (error) {
            next(error);
        }
    }

    async deleteEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
            const eventId: number = Number(req.params.id);
            await this.deleteEventUseCase.execute(eventId);
            res.status(HttpStatusCode.OK).json({ message: SuccessMessages.EVENT_DELETED });
        } catch (error) {
            next(error);
        }
    }

    async listEvents(req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
            const events = await this.listEventsUseCase.execute();
            res.json(events);
        } catch (error) {
            next(error);
        }
    }

}

