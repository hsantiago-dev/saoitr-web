import { UseCase } from "../domain/base/use-case";
import { User } from "../domain/entities/user";
import { UserGateway } from "../domain/gateways/user.gateway";

export class SignInUseCase implements UseCase<User> {
    
        constructor(private userGateway: UserGateway) { }
    
        async execute(email: string, password: string): Promise<User> {
            return await this.userGateway.login(email, password);
        }
}