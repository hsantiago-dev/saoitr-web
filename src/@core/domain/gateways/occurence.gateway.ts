import { Occurrence } from "../entities/occurrence";

export abstract class OccurrenceGateway {

    abstract create(data: Occurrence): Promise<Occurrence>;
    abstract update(id: number, data: Occurrence): Promise<Occurrence>;
    abstract getAll(): Promise<Occurrence[]>;
    abstract getMany(filter: Partial<Occurrence>): Promise<Occurrence[]>;
    abstract delete(id: number): Promise<void>;
}