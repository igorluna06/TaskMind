import { UpdateDataDTO } from "../../dtos/event/updateEventDTO";
import { IEventRepository } from "../../repositories/IEventRepository";
import { Event } from "../../../domain/entities/Event";
import { InvalidCreateEventDateError } from "./errors/InvalidCreateEventDateError";
import { InvalidCreateEventTimeError } from "./errors/InvalidCreateEventTimeError";
import { EventStatus } from "../../../domain/enums/EventEnum/EventStatus";

export class UpdateEventUseCase {

    private eventRepository : IEventRepository;

    constructor(eventRepository : IEventRepository) {
        this.eventRepository = eventRepository;
    }

    async execute(eventId: number, updatedData: UpdateDataDTO){

        const eventFound: Event | null = await this.eventRepository.findById(eventId);

        if(!eventFound){
            throw new Error("Event not found");
        }

        if(updatedData === undefined){
            throw new Error("No data provided for update");
        }

        if(updatedData.title !== undefined){
            eventFound.rename(updatedData.title);
        }

        if(updatedData.type !== undefined){
            eventFound.setType(updatedData.type);
        }

        if(updatedData.description !== undefined){
            eventFound.setDescription(updatedData.description);
        }

        if (updatedData.date !== undefined || updatedData.time !== undefined) {

        const currentDateTime = eventFound.getDateTime();

        let year = currentDateTime.getFullYear();
        let month = currentDateTime.getMonth();
        let day = currentDateTime.getDate();
        let hours = currentDateTime.getHours();
        let minutes = currentDateTime.getMinutes();

        if (updatedData.date !== undefined) {
            const formatDateValid = /^\d{4}-\d{2}-\d{2}$/;

            const isValidDate = (data: string) => {
                const [y, m, d] = data.split('-').map(Number);
                const date = new Date(y, m - 1, d);
                return (
                    date.getFullYear() === y &&
                    date.getMonth() === m - 1 &&
                    date.getDate() === d
                );
            };

            if (!formatDateValid.test(updatedData.date) || !isValidDate(updatedData.date)) {
                throw new InvalidCreateEventDateError();
            }

            const [y, m, d] = updatedData.date.split('-').map(Number);
            year = y;
            month = m - 1;
            day = d;
        }

        if (updatedData.time !== undefined) {
            const timeRegex = /^([0-1]\d|2[0-3]):([0-5]\d)$/;

            if (!timeRegex.test(updatedData.time)) {
                throw new InvalidCreateEventTimeError();
            }

            const [h, min] = updatedData.time.split(':').map(Number);
            hours = h;
            minutes = min;
        }

        const newDateTime = new Date(year, month, day, hours, minutes);
        eventFound.reschedule(newDateTime);
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
                    throw new Error("Invalid status value");
            }
        }
        
        const updatedEvent = await this.eventRepository.update(eventFound);

        return updatedEvent;
    }
}