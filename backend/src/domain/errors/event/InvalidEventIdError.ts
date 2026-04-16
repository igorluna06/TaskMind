export class InvalidEventIdError extends Error {

    private statusCode: number;
    private code : string;

    constructor() {
        super("ID de evento inválido");
        this.name = "InvalidEventIdError";
        this.code = "INVALID_EVENT_ID";
        this.statusCode = 400;
    }

    getStatusCode(): number {
        return this.statusCode;
    }

    getErrorCode(): string {
        return this.code;
    }
}