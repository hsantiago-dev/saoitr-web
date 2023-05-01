import { User } from "@/@core/domain/entities/user";
import { UserGateway } from "@/@core/domain/gateways/user.gateway";

import { AxiosInstance } from "axios";
import { TokenStorage } from "../interfaces/token-storage";
import { UserLoggedDto } from "@/@core/shared/user-logged.dto";

export class UserHttpGateway implements UserGateway {
    constructor(private http: AxiosInstance, private tokenStorage: TokenStorage) { }

    private returnAuthorizationConfig() {
        return {
            headers: {
                Authorization: `Bearer ${this.tokenStorage.getToken()}`
            },
        }
    }

    //autenticação
    async login(email:string, password: string): Promise<User> {
        
        const res = await this.http.post<UserLoggedDto>('/login', { email, password });
        
        this.tokenStorage.saveToken(res.data.token);
        return res.data as User;
    }

    async logout(): Promise<void> {
        
        const res = await this.http.post<void>('/logout', {}, this.returnAuthorizationConfig());
        return res.data;
    }
    
    async register(data: User): Promise<User> {
        const res = await this.http.post<User>('/users', data);
        return res.data;
    }
    update(id: number, data: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
    getById(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
}