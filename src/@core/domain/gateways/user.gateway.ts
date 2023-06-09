import { User } from "../entities/user";

export abstract class UserGateway {

    //autenticação
    abstract login(email: string, password: string): Promise<User>;
    abstract logout(id: number): Promise<void>;

    abstract register(data: User): Promise<User>;
    abstract update(id: number, data: Partial<User>): Promise<User>;
    abstract getById(): Promise<User[]>;
    abstract delete(id: number): Promise<void>;
}