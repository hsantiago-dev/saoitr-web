import { UseCase } from "../../domain/base/use-case";
import { UserGateway } from "../../domain/gateways/user.gateway";

export class DestroyUserUseCase implements UseCase<void> {
    
        constructor(private userGateway: UserGateway) { }
    
        async execute(id: number): Promise<void> {

            return await this.userGateway.delete(id);
        }
}