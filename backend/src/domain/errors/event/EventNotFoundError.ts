export class EventNotFoundError extends Error {

    
    private code: string;
    private statusCode: number;

    constructor() {
        super("Evento não encontrado");
        this.name = "EventNotFoundError";
        this.code = "EVENT_NOT_FOUND";
        this.statusCode = 404;
    }

    getCode(): string {
        return this.code;
    }

    getStatusCode(): number {
        return this.statusCode;
    }
}