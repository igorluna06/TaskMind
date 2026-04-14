export class StatusAlreadySetError extends Error {
    private code: string;
    private statusCode: number;

    constructor(EventStatus: string) {
        super(`Status já está definido como ${EventStatus}`);
        this.name = "StatusAlreadySetError";
        this.code = "STATUS_ALREADY_SET";
        this.statusCode = 400;
    }

    getCode(): string {
        return this.code;
    }

    getStatusCode(): number {
        return this.statusCode;
    }
}