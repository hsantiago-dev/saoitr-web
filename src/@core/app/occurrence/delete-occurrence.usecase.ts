import { UseCase } from "../../domain/base/use-case";
import { OccurrenceGateway } from "@/@core/domain/gateways/occurence.gateway";

export class DeleteOccurrenceUseCase implements UseCase<void> {
    
        constructor(private occurrenceGateway: OccurrenceGateway) { }
    
        async execute(id: number): Promise<void> {
            
            return await this.occurrenceGateway.delete(id);
        }
}