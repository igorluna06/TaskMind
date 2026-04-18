export class InvalidAIResponseError extends Error {
  
    private statusCode: number;
    private code: string;
  
    constructor() {
        super("A IA retornou uma resposta inválida. Tente novamente.");
        this.name = "InvalidAIResponseError";
        this.code = "INVALID_AI_RESPONSE";
        this.statusCode = 500;
    }

    getStatusCode(): number {
        return this.statusCode;
    }

    getErrorCode(): string {
        return this.code;
    }
}