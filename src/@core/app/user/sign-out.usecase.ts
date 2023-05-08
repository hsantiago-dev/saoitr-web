import { UseCase } from "../../domain/base/use-case";
import { UserGateway } from "../../domain/gateways/user.gateway";

export class SignOutUseCase implements UseCase<void> {
    
        constructor(private userGateway: UserGateway) { }
    
        async execute(id: number): Promise<void> {
            
            return await this.userGateway.logout(id);
        }
}