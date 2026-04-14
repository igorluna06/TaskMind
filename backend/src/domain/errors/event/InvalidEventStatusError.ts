export class InvalidEventStatusError extends Error {

    private code: string;
    private statusCode: number;

    constructor() {
        super("Status do evento é inválido");
        this.name = "InvalidEventStatusError";
        this.code = "INVALID_EVENT_STATUS";
        this.statusCode = 400;
    }

    getCode(): string {
        return this.code;
    }

    getStatusCode(): number {
        return this.statusCode;
    }
}