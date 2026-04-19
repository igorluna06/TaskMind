import { EventStatus } from "../../../domain/enums/EventEnum/EventStatus";
import { EventType } from "../../../domain/enums/EventEnum/EventType";

export interface EventFilterDTO {
    type?: EventType,
    status?: EventStatus,
    title?: string,
    dateTimeFrom?: Date,
    dateTimeTo?: Date

}