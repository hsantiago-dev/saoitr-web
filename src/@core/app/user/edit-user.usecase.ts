import { UseCase } from "../../domain/base/use-case";
import { User } from "../../domain/entities/user";
import { UserGateway } from "../../domain/gateways/user.gateway";

export class EditUserUseCase implements UseCase<User> {
    
        constructor(private userGateway: UserGateway) { }
    
        async execute(id: number, user: UserEdit): Promise<User> {
            
            let updateParams: Partial<User> = {
                name: user.name!,
                email: user.email!,
                password: user.password
            };

            return await this.userGateway.update(id, updateParams);
        }
}

type UserEdit = {
    name: string | null;
    email: string | null;
    password: string | null;
}