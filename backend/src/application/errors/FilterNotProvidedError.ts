export class FilterNotProvidedError extends Error {

    private statusCode: number;
    private code: string;

    constructor() {
        super("Filtro não fornecido.");
        this.name = "FilterNotProvidedError";
        this.code = "FILTER_NOT_PROVIDED";
        this.statusCode = 400;
    }

    getStatusCode(): number {
        return this.statusCode;
    }

    getCode(): string {
        return this.code;
    }
}