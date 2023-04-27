import { User } from "@/@core/domain/entities/user";
import { UserGateway } from "@/@core/domain/gateways/user.gateway";

import { AxiosInstance } from "axios";

export class UserHttpGateway implements UserGateway {
    constructor(private http: AxiosInstance) { }

    //autenticação
    login(email:string, password: string): Promise<User> {
        
        return this.http.post<User>('/login', { email, password })
        .then(res => res.data);
    }
    logout(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
    register(data: User): Promise<User> {
        return this.http.post<User>('/users', data)
        .then(res => res.data);
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