export class EventCannotBeDeletedError extends Error {
    
    private statusCode: number;
    private code : string;
    
    constructor() {
        super("Apenas eventos pendentes podem ser deletados");
        this.name = "EventCannotBeDeletedError";
        this.code = "EVENT_CANNOT_BE_DELETED";
        this.statusCode = 400;
    }

    getStatusCode(): number {
        return this.statusCode;
    }

    getErrorCode(): string {
        return this.code;
    }
}