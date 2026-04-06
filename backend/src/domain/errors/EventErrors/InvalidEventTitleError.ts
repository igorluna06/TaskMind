export class InvalidEventTitleError extends Error {
    private code: string;
    private statusCode: number;


    constructor() {
        super("Título do evento inválido");
        this.name = "InvalidEventTitleError";
        this.code = "INVALID_EVENT_TITLE";
        this.statusCode = 400;
    }

    getCode(): string {
        return this.code;
    }

    getStatusCode(): number {
        return this.statusCode;
    }
}