// src/domain/enums/EventEnum/AllowedNotificationTimings.ts
import { EventType } from "./EventType";
import { NotificationTiming } from "./NotificationTiming";

export const AllowedNotificationTimings: Record<EventType, NotificationTiming[]> = {
  [EventType.URGENT]: [
    NotificationTiming.AT_TIME_OF_EVENT,
    NotificationTiming.TEN_MINUTES_BEFORE,
    NotificationTiming.THIRTY_MINUTES_BEFORE,
    NotificationTiming.ONE_HOUR_BEFORE,
    NotificationTiming.ONE_DAY_BEFORE,
    NotificationTiming.THREE_DAYS_BEFORE,
  ],
  [EventType.WORKOUT]: [
    NotificationTiming.AT_TIME_OF_EVENT,
    NotificationTiming.TEN_MINUTES_BEFORE,
  ],
  [EventType.STUDY]: [
    NotificationTiming.AT_TIME_OF_EVENT,
    NotificationTiming.TEN_MINUTES_BEFORE,
    NotificationTiming.ONE_HOUR_BEFORE,
  ],
};