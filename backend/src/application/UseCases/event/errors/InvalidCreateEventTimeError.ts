export class InvalidCreateEventTimeError extends Error {

    private code: string;
    private statusCode: number;

    constructor() {
        super("Horário do evento inválido");
        this.name = "InvalidCreateEventTimeError";
        this.code = "INVALID_CREATE_EVENT_TIME";
        this.statusCode = 400;
    }

    getCode(): string {
        return this.code;
    }

    getStatusCode(): number {
        return this.statusCode;
    }
}