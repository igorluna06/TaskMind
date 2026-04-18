import { InvalidEventDescriptionError } from "../errors/event/InvalidEventDescriptionError";
import { InvalidEventTitleError } from "../errors/event/InvalidEventTitleError";
import { InvalidEventTypeError } from "../errors/event/InvalidEventTypeError";
import { EventStatus } from "../enums/EventEnum/EventStatus";
import { EventType } from "../enums/EventEnum/EventType";
import { NotificationTiming } from "../enums/EventEnum/NotificationTiming";
import { InvalidEventScheduleError } from "../errors/event/InvalidEventScheduleError";
import { InvalidEventDurationError } from "../errors/event/InvalidEventDurationError";
import { InvalidEventNotificationTimingError } from "../errors/event/InvalidEventNotificationTimingError";
import { StatusAlreadySetError }  from "../errors/event/StatusAlreadySetError";
import { AllowedNotificationTimings } from "../enums/EventEnum/AllowedNotificationTimings";

export class Event{

    private id: number | undefined;
    private title: string;
    private type: EventType;
    private description: string;
    private dateTime: Date;
    private duration: number;
    private notificationTiming: NotificationTiming[];
    private status: EventStatus;

    constructor(
        title: string,
        type: EventType,
        description: string,
        dateTime: Date,
        duration: number,
        id?: number,
        status?: EventStatus
    ) {
        this.id = id;
        this.title = title;
        this.type = type;
        this.description = description;
        this.dateTime = dateTime;
        this.duration = duration;
        this.notificationTiming = AllowedNotificationTimings[type];
        this.status = status ?? EventStatus.PENDING;
    }

    getEventId(): number | undefined { return this.id; }
    getTitle(): string { return this.title; }
    getType(): EventType { return this.type; }
    getDescription(): string { return this.description; }
    getDateTime(): Date { return this.dateTime; }
    getDuration(): number { return this.duration; }
    getNotificationTiming(): NotificationTiming[] { return this.notificationTiming; }
    getStatus(): EventStatus { return this.status; }

    rename(title: string): void {
        if (!title) {
            throw new InvalidEventTitleError();
        }
        this.title = title;
    }

    setType(type: EventType): void {
        if (!type) {
            throw new InvalidEventTypeError();
        }
        this.type = type;
    }

    setDescription(description: string): void {
        if (!description) {
            throw new InvalidEventDescriptionError();
        }
        this.description = description;
    }

    reschedule(dateTime: Date): void {
        if (!dateTime) {
            throw new InvalidEventScheduleError();
        }
        this.dateTime = dateTime;
    }

    setDuration(duration: number): void {
        if (duration <= 0) {
            throw new InvalidEventDurationError();
        }
        this.duration = duration;
    }

    setNotificationTiming(notificationTiming: NotificationTiming[]): void {
        if (notificationTiming.length === 0) {
            throw new InvalidEventNotificationTimingError();
        }
        this.notificationTiming = notificationTiming;
    }

    addNotificationTiming(timing: NotificationTiming): void {
        if (!timing) {
            throw new InvalidEventNotificationTimingError();
        }
        if (this.notificationTiming.includes(timing)) return;
        this.notificationTiming.push(timing);
    }

    removeNotificationTiming(timing: NotificationTiming): void {
        if (!timing) {
            throw new InvalidEventNotificationTimingError();
        }
        this.notificationTiming = this.notificationTiming.filter(t => t !== timing);
        if (this.notificationTiming.length === 0) {
            throw new InvalidEventNotificationTimingError();
        }
    }

    MarkAsCancel(): void {
        if (this.status === EventStatus.CANCELLED) {
            throw new StatusAlreadySetError(EventStatus.CANCELLED);
        }
        this.status = EventStatus.CANCELLED;
    }

    MarkAsActive(): void {
        if (this.status === EventStatus.ACTIVE) {
            throw new StatusAlreadySetError(EventStatus.ACTIVE);
        }
        this.status = EventStatus.ACTIVE;
    }

    MarkAsDone(): void {
        if (this.status === EventStatus.DONE) {
            throw new StatusAlreadySetError(EventStatus.DONE);
        }
        this.status = EventStatus.DONE;
    }

    MarkAsMissed(): void {
        if (this.status === EventStatus.MISSED) {
            throw new StatusAlreadySetError(EventStatus.MISSED);
        }
        this.status = EventStatus.MISSED;
    }

    MarkAsPending(): void {
        if (this.status === EventStatus.PENDING) {
            throw new StatusAlreadySetError(EventStatus.PENDING);
        }
        this.status = EventStatus.PENDING;
    }

}