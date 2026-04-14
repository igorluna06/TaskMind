export class InvalidEventDurationError extends Error {
    private code: string;
    private statusCode: number;

    constructor() {
        super("Duração do evento inválida");
        this.name = "InvalidEventDurationError";
        this.code = "INVALID_EVENT_DURATION";
        this.statusCode = 400;
    }

    getCode(): string {
        return this.code;
    }

    getStatusCode(): number {
        return this.statusCode;
    }
}