export class InvalidEventNotificationTimingError extends Error {
    private code: string;
    private statusCode: number;

    constructor() {
        super("Tempo de notificação do evento inválido");
        this.name = "InvalidEventNotificationTimingError";
        this.code = "INVALID_EVENT_NOTIFICATION_TIMING";
        this.statusCode = 400;
    }

    getCode(): string {
        return this.code;
    }

    getStatusCode(): number {
        return this.statusCode;
    }
}