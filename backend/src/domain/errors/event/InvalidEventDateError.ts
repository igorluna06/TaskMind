export class InvalidEventDateError extends Error {

    private code: string;
    private statusCode: number;

    constructor() {
        super("Data do evento inválidos");
        this.name = "InvalidCreateEventDateError";
        this.code = "INVALID_CREATE_EVENT_DATE";
        this.statusCode = 400;
    }

    getCode(): string {
        return this.code;
    }

    getStatusCode(): number {
        return this.statusCode;
    }
}