import { Event } from "../../../../domain/entities/Event";
import { Event as PrismaEvent } from "@prisma/client";
import { EventType } from "../../../../domain/enums/EventEnum/EventType";
import { EventStatus } from "../../../../domain/enums/EventEnum/EventStatus";
import { NotificationTiming } from "../../../../domain/enums/EventEnum/NotificationTiming";

export class PrismaEventMapper {
  static toDomain(prismaEvent: PrismaEvent): Event {
    return new Event(
      prismaEvent.title,
      prismaEvent.type as unknown as EventType,
      prismaEvent.description,
      prismaEvent.dateTime,
      prismaEvent.duration,
      prismaEvent.isRecurring,
      prismaEvent.notificationTiming as unknown as NotificationTiming,
      prismaEvent.id,
      prismaEvent.status as unknown as EventStatus
    );
  }
}