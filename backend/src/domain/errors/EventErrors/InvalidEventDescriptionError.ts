export class InvalidEventDescriptionError extends Error {
    private code: string;
    private statusCode: number;

    constructor() {
        super("Descrição do evento inválida");
        this.name = "InvalidEventDescriptionError";
        this.code = "INVALID_EVENT_DESCRIPTION";
        this.statusCode = 400;
    }

    getCode(): string {
        return this.code;
    }

    getStatusCode(): number {
        return this.statusCode;
    }
}