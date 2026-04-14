export class MissingRequiredFieldsError extends Error {

    private code: string;
    private statusCode: number;

    constructor() {
        super("Campos obrigatorios vazios ou nao fornecidos");
        this.name = "MissingRequiredFieldsError";
        this.code = "MISSING_REQUIRED_FIELDS";
        this.statusCode = 400;
    }

    getCode(): string {
        return this.code;
    }

    getStatusCode(): number {
        return this.statusCode;
    }
}