export interface Event {
  id: number;
  title: string;
  type: string;
  description: string;
  dateTime: string;
  duration: number;
  notificationTiming: string[];
  status: string;
}