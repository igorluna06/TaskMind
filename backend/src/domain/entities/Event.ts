import { InvalidEventDescriptionError } from "../errors/EventErrors/InvalidEventDescriptionError";
import { InvalidEventTitleError } from "../errors/EventErrors/InvalidEventTitleError";
import { InvalidEventTypeError } from "../errors/EventErrors/InvalidEventTypeError";
import { EventStatus } from "../enums/EventEnum/EventStatus";
import { EventType } from "../enums/EventEnum/EventType";
import { NotificationTiming } from "../enums/EventEnum/NotificationFrequency";
import { InvalidEventScheduleError } from "../errors/EventErrors/InvalidEventScheduleError";
import { InvalidEventDurationError } from "../errors/EventErrors/InvalidEventDurationError";
import { InvalidEventNotificationTimingError } from "../errors/EventErrors/InvalidEventNotificationTimingError";
import { StatusAlreadySetError }  from "../errors/EventErrors/StatusAlreadySetError";

export class Event{

    private eventId: number;
    private title: string;
    private type: EventType;
    private description: string;
    private date: Date;
    private time: string;
    private duration: number;
    private isRecurring: boolean;
    private notificationTiming: NotificationTiming;
    private status: EventStatus;

    constructor(
        eventId: number,
        title: string,
        type: EventType,
        description: string,
        date: Date,
        time: string,
        duration: number,
        isRecurring: boolean,
        notificationTiming: NotificationTiming,
    ) {
        this.eventId = eventId;
        this.title = title;
        this.type = type;
        this.description = description;
        this.date = date;
        this.time = time;
        this.duration = duration;
        this.isRecurring = isRecurring;
        this.notificationTiming = notificationTiming;
        this.status = EventStatus.PENDING;
    }

    getEventId(): number { return this.eventId; }
    getTitle(): string { return this.title; }
    getType(): EventType { return this.type; }
    getDescription(): string { return this.description; }
    getDate(): Date { return this.date; }
    getTime(): string { return this.time; }
    getDuration(): number { return this.duration; }
    getIsRecurring(): boolean { return this.isRecurring; }
    getNotificationTiming(): NotificationTiming { return this.notificationTiming; }
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

    reschedule(date: Date, time: string): void {
        if (!date || !time) {
            throw new InvalidEventScheduleError();
        }
        this.date = date;
        this.time = time;
    }

    setDuration(duration: number): void {
        if (duration <= 0) {
            throw new InvalidEventDurationError();
        }
        this.duration = duration;
    }

    setIsRecurring(isRecurring: boolean): void {
        this.isRecurring = isRecurring;
    }

    setNotificationTiming(notificationTiming: NotificationTiming): void {
        if (!notificationTiming) {
            throw new InvalidEventNotificationTimingError();
        }
        this.notificationTiming = notificationTiming;
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