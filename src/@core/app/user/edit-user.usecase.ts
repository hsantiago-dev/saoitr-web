import { UseCase } from "../../domain/base/use-case";
import { User } from "../../domain/entities/user";
import { UserGateway } from "../../domain/gateways/user.gateway";

export class EditUserUseCase implements UseCase<User> {
    
        constructor(private userGateway: UserGateway) { }
    
        async execute(id: number, user: UserEdit): Promise<User> {
            
            let updateParams: Partial<User> = {};

            if (user.name) {
                updateParams.name = user.name;
            } else if (user.email) {
                updateParams.email = user.email;
            } else if (user.password) {
                updateParams.password = user.password;
            }

            return await this.userGateway.update(id, updateParams);
        }
}

type UserEdit = {
    name: string | null;
    email: string | null;
    password: string | null;
}