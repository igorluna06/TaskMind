export class InvalidEventTypeError extends Error {
    private code: string;
    private statusCode: number;

    constructor() {
        super("Tipo de evento inválido");
        this.name = "InvalidEventTypeError";
        this.code = "INVALID_EVENT_TYPE";
        this.statusCode = 400;
    }

    getCode(): string {
        return this.code;
    }

    getStatusCode(): number {
        return this.statusCode;
    }
}