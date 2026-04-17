import { EventFilterDTO } from "../../application/dtos/event/eventFilterDTO";
import { IEventRepository } from "../../application/repositories/IEventRepository";
import { prisma } from "../database/prisma/prismaClient";
import { Event } from "../../domain/entities/Event";
import { PrismaEventMapper } from "../database/prisma/mappers/PrismaEventMapper";

export class PrismaEventRepository implements IEventRepository {

    async create(event: Event): Promise<Event> {
        await prisma.event.create({
            data: {
                title: event.getTitle(),
                type: event.getType(),
                description: event.getDescription(),
                dateTime: event.getDateTime(),
                duration: event.getDuration(),
                isRecurring: event.getIsRecurring(),
                notificationTiming: event.getNotificationTiming(),
                status: event.getStatus()
            }
        });
        return event;
    }
    async findById(id: number): Promise<Event | null> {
        const event = await prisma.event.findUnique({
            where: { id }
        });
        if(!event) {
            return null;
        }
        return PrismaEventMapper.toDomain(event);
    }
    async update(event: Event): Promise<Event | null> {
        await prisma.event.update({
            where: { id: event.getEventId() },
            data: {
                title: event.getTitle(),
                type: event.getType(),
                description: event.getDescription(),
                dateTime: event.getDateTime(),
                duration: event.getDuration(),
                isRecurring: event.getIsRecurring(),
                notificationTiming: event.getNotificationTiming(),
                status: event.getStatus()
            }
        });
        return event;
    }
    async delete(id: number): Promise<void> {
        await prisma.event.delete({
            where: { id }
        });
    }
    async findByFilter(filter: EventFilterDTO): Promise<Event[]> {
        const events = await prisma.event.findMany({
            where: {
                type: filter.type,
                status: filter.status
            }
        });
        return events.map(PrismaEventMapper.toDomain);
    }
    async findAll(): Promise<Event[]> {
        const events = await prisma.event.findMany();
        return events.map(PrismaEventMapper.toDomain);
    }

}