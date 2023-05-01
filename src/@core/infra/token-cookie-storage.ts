import { injectable } from "inversify";
import { TokenStorage } from "./interfaces/token-storage";

@injectable()
export class TokenCookieStorage implements TokenStorage {

    constructor() { }

    public saveToken(value: string): void {
        
        const EXPIRE_TIME_IN_DAYS = 1;
        
        const date = new Date();
        date.setTime(date.getTime() + (EXPIRE_TIME_IN_DAYS*24*60*60*1000));
        const expires = "; expires=" + date.toUTCString();
        
        document.cookie = "token=" + (value || "")  + expires + "; path=/";
    }

    public getToken(): string {

        const cookie = document.cookie.split(';').find(c => {
            return c.trim().startsWith('token=');
        });

        if (!cookie) {
            return '';
        }

        const token = cookie.replace('token=', '');

        return token;
    }

    public deleteToken(): void {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
}