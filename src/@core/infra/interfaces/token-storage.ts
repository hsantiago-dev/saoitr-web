
export abstract class TokenStorage {
    abstract saveToken(value: string): void;
    abstract getToken(): string;
    abstract deleteToken(): void;
}