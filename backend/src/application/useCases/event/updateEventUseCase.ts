import { UpdateDataDTO } from "../../dtos/event/updateEventDTO";
import { IEventRepository } from "../../repositories/IEventRepository";
import { Event } from "../../../domain/entities/Event";
import { InvalidEventDateError } from "../../../domain/errors/event/InvalidEventDateError";
import { InvalidEventTimeError } from "../../../domain/errors/event/InvalidEventTimeError";
import { EventStatus } from "../../../domain/enums/EventEnum/EventStatus";
import { isValidDate } from "../../../utils/date/validations/isValidDate";
import { isValidTime } from "../../../utils/date/validations/isValidTime";
import { MissingRequiredFieldsError } from "../../errors/MissingRequiredFieldsError";
import { EventNotFoundError } from "../../../domain/errors/event/EventNotFoundError";
import { buildDateTime } from "../../../utils/date/format/buildDateTime";
import { InvalidEventStatusError } from "../../../domain/errors/event/InvalidEventStatusError";
import { EventType } from "../../../domain/enums/EventEnum/EventType";
import { InvalidEventTypeError } from "../../../domain/errors/event/InvalidEventTypeError";

export class UpdateEventUseCase {

    private eventRepository : IEventRepository;

    constructor(eventRepository : IEventRepository) {
        this.eventRepository = eventRepository;
    }

    async execute(eventId: number, updatedData: UpdateDataDTO): Promise<Event | null> {

        const eventFound: Event | null = await this.eventRepository.findById(eventId);

        if(!eventFound){
            throw new EventNotFoundError();
        }

        if(!updatedData || Object.values(updatedData).every(value => value === undefined || value === null)){
            throw new MissingRequiredFieldsError();
        }

        if(updatedData.title !== undefined){
            eventFound.rename(updatedData.title);
        }

        if(updatedData.type !== undefined){
            if(!Object.values(EventType).includes(updatedData.type)){
                throw new InvalidEventTypeError();
            }
            eventFound.setType(updatedData.type);
        }

        if(updatedData.description !== undefined){
            eventFound.setDescription(updatedData.description);
        }

        if (updatedData.date !== undefined) {
            if (!isValidDate(updatedData.date)) {
                throw new InvalidEventDateError();
            }
            
            eventFound.reschedule(buildDateTime(updatedData.date, eventFound.getDateTime().getTime().toString()));
        }

        if (updatedData.time !== undefined) {
            if (!isValidTime(updatedData.time)) {
                throw new InvalidEventTimeError();
            }

            eventFound.reschedule(buildDateTime(eventFound.getDateTime().getDate().toString(), updatedData.time));
        }


        if(updatedData.duration !== undefined){
            eventFound.setDuration(updatedData.duration);
        }

        if(updatedData.notificationTiming !== undefined){
            eventFound.setNotificationTiming(updatedData.notificationTiming);
        }

        if(updatedData.status !== undefined){
            switch(updatedData.status){
                case EventStatus.ACTIVE:
                    eventFound.MarkAsActive();
                    break;
                case EventStatus.CANCELLED:
                    eventFound.MarkAsCancel();
                    break;
                case EventStatus.DONE:
                    eventFound.MarkAsDone();
                    break;
                case EventStatus.MISSED:
                    eventFound.MarkAsMissed();
                    break;
                case EventStatus.PENDING:
                    eventFound.MarkAsPending();
                    break;
                default:
                    throw new InvalidEventStatusError();
            }
        }
        
        const updatedEvent = await this.eventRepository.update(eventFound);

        return updatedEvent;
    }
}