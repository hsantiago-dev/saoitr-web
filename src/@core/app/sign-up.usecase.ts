import { UseCase } from "../domain/base/use-case";
import { User } from "../domain/entities/user";
import { UserGateway } from "../domain/gateways/user.gateway";

type SignUpParams = {
    name: string;
    email: string;
    password: string;
}

export class SignUpUseCase implements UseCase<User> {
    
        constructor(private userGateway: UserGateway) { }
    
        async execute(params: SignUpParams): Promise<User> {
            const user = new User(params);

            return await this.userGateway.register(user);
        }
}