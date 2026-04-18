import { EventType } from "../../../domain/enums/EventEnum/EventType";

export interface AIEventDTO {
  title: string;
  date: string;
  time: string;
  duration: number;
  type?: EventType;
  description?: string;
}