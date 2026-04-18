import { AIEventDTO } from "../../../application/dtos/ai/aiEventDTO";

export type InterpreterResponse =
  | { state: "COLLECTING"; message: string }
  | { state: "CONFIRMING"; message: string; data: AIEventDTO }
  | { state: "DONE"; data: AIEventDTO };

