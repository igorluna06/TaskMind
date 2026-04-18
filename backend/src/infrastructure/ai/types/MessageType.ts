import { MessageRole } from "../groq/constants/MessageRole";

export type Message = {
  role: MessageRole.USER | MessageRole.ASSISTANT;
  content: string;
};