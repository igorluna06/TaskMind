export class InvalidEventScheduleError extends Error {
    private code: string;
    private statusCode: number;

    constructor() {
        super("Data e horário do evento inválidos");
        this.name = "InvalidEventScheduleError";
        this.code = "INVALID_EVENT_SCHEDULE";
        this.statusCode = 400;
    }

    getCode(): string {
        return this.code;
    }

    getStatusCode(): number {
        return this.statusCode;
    }
}