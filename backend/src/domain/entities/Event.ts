import { InvalidEventDescriptionError } from "../errors/EventErrors/InvalidEventDescriptionError";
import { InvalidEventTitleError } from "../errors/EventErrors/InvalidEventTitleError";
import { InvalidEventTypeError } from "../errors/EventErrors/InvalidEventTypeError";
import { EventStatus } from "../enums/EventEnum/EventStatus";
import { EventType } from "../enums/EventEnum/EventType";
import { NotificationTiming } from "../enums/EventEnum/NotificationTiming";
import { InvalidEventScheduleError } from "../errors/EventErrors/InvalidEventScheduleError";
import { InvalidEventDurationError } from "../errors/EventErrors/InvalidEventDurationError";
import { InvalidEventNotificationTimingError } from "../errors/EventErrors/InvalidEventNotificationTimingError";
import { StatusAlreadySetError }  from "../errors/EventErrors/StatusAlreadySetError";

export class Event{

    private id: number | undefined;
    private title: string;
    private type: EventType;
    private description: string;
    private dateTime: Date;
    private duration: number;
    private isRecurring: boolean;
    private notificationTiming: NotificationTiming;
    private status: EventStatus;

    constructor(
        title: string,
        type: EventType,
        description: string,
        dateTime: Date,
        duration: number,
        isRecurring: boolean,
        notificationTiming: NotificationTiming,
        id?: number | undefined,
    ) {
        this.id = id;
        this.title = title;
        this.type = type;
        this.description = description;
        this.dateTime = dateTime;
        this.duration = duration;
        this.isRecurring = isRecurring;
        this.notificationTiming = notificationTiming;
        this.status = EventStatus.PENDING;
    }

    getEventId(): number | undefined { return this.id; }
    getTitle(): string { return this.title; }
    getType(): EventType { return this.type; }
    getDescription(): string { return this.description; }
    getDateTime(): Date { return this.dateTime; }
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