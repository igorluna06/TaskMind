import { EventStatus } from "../../../domain/enums/EventEnum/EventStatus";
import { EventType } from "../../../domain/enums/EventEnum/EventType";
import { NotificationTiming } from "../../../domain/enums/EventEnum/NotificationTiming";

export interface UpdateDataDTO {
    title?: string;
    type?: EventType;
    description?: string;
    date?: string;
    time?: string;
    duration?: number;
    addNotificationTiming?: NotificationTiming[];
    removeNotificationTiming?: NotificationTiming[];
    setNotificationTiming?: NotificationTiming[];
    status?: EventStatus;
}