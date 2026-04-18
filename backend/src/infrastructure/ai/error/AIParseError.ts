export class AIParseError extends Error {
    private statusCode: number;
    private code: string;

    constructor() {
        super("Erro ao interpretar a resposta da IA. Tente novamente.");
        this.name = "AIParseError";
        this.code = "AI_PARSE_ERROR";
        this.statusCode = 500;
    }

    getStatusCode(): number {
        return this.statusCode;
    }

    getErrorCode(): string {
        return this.code;
    }
}