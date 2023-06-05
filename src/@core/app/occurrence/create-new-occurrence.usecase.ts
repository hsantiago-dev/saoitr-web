import { Occurrence } from "@/@core/domain/entities/occurrence";
import { UseCase } from "../../domain/base/use-case";
import { OccurrenceGateway } from "@/@core/domain/gateways/occurence.gateway";

export class CreateNewOccurrenceUseCase implements UseCase<Occurrence> {
    
        constructor(private occurrenceGateway: OccurrenceGateway) { }
    
        async execute(data: Occurrence): Promise<Occurrence> {
            
            return await this.occurrenceGateway.create(data);
        }
}