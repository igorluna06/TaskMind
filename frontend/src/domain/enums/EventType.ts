export const EventType = {
  WORKOUT: "WORKOUT",
  STUDY: "STUDY",
  URGENT: "URGENT",
} as const;

export type EventType = typeof EventType[keyof typeof EventType];