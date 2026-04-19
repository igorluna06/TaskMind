import { AIEventDTO } from "../../../application/dtos/ai/aiEventDTO";
import { EventFilterDTO } from "../../../application/dtos/event/eventFilterDTO";

export type InterpreterResponse =
  | { state: "COLLECTING"; message: string }
  | { state: "CONFIRMING"; message: string; data: AIEventDTO }
  | { state: "DONE"; data: AIEventDTO }
  | { state: "SEARCHING"; filters: EventFilterDTO}
  | { state: "CANCELLED"; message: string }

