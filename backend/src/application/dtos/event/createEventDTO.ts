import { EventType } from "../../../domain/enums/EventEnum/EventType";
import { NotificationTiming } from "../../../domain/enums/EventEnum/NotificationTiming";

export interface CreateEventDTO {
    title: string;
    type: EventType;
    description: string;
    date: string;
    time: string;
    duration: number;
}