export const EventStatus = {
  PENDING: "PENDING",
  ACTIVE: "ACTIVE",
  CANCELLED: "CANCELLED",
  DONE: "DONE",
  MISSED: "MISSED",
} as const;

export type EventStatus = typeof EventStatus[keyof typeof EventStatus];