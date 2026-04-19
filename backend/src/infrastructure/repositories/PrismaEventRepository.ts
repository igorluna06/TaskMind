import { EventFilterDTO } from "../../application/dtos/event/eventFilterDTO";
import { IEventRepository } from "../../application/repositories/IEventRepository";
import { prisma } from "../database/prisma/prismaClient";
import { Event } from "../../domain/entities/Event";
import { PrismaEventMapper } from "../database/prisma/mappers/PrismaEventMapper";
import { Prisma } from "@prisma/client";
import { PrismaQueryOptions } from "../database/prisma/constants/PrismaQueryOptions";

export class PrismaEventRepository implements IEventRepository {

    async create(event: Event): Promise<Event> {
        await prisma.event.create({
            data: {
                title: event.getTitle(),
                type: event.getType(),
                description: event.getDescription(),
                dateTime: event.getDateTime(),
                duration: event.getDuration(),
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

        const where: Prisma.EventWhereInput = {};

        if(filter.type){
            where.type = filter.type;
        }

        if(filter.status){
            where.status = filter.status;
        }

        if(filter.title){
            where.title = {
                contains: filter.title,
                mode: PrismaQueryOptions.INSENTIVE
            };
        }

        if(filter.dateTimeFrom || filter.dateTimeTo){
            where.dateTime = {};
            if(filter.dateTimeFrom){
                where.dateTime.gte = filter.dateTimeFrom;
            }
            if(filter.dateTimeTo){
                where.dateTime.lte = filter.dateTimeTo;
            }
        }

        const events = await prisma.event.findMany({where});
        return events.map(PrismaEventMapper.toDomain);
    }
    async findAll(): Promise<Event[]> {
        const events = await prisma.event.findMany();
        return events.map(PrismaEventMapper.toDomain);
    }

}