import { Entity } from "../base/entity";
import { OccurrenceTypes } from "./occurrence-types";

export class Occurrence extends Entity {
    public registered_at: string;
    public local: string;
    public occurrenceType: number;
    public occurrenceTypeDescription: string;
    public km: number;
    public userId: number;

    public constructor(data: Partial<Occurrence>) {
        super();

        this.validateRequiredData(data);
        
        this.id = data.id;
        this.registered_at = data.registered_at!;
        this.local = data.local!;
        this.occurrenceType = data.occurrenceType!;
        const occurrenceTypes = new OccurrenceTypes();
        this.occurrenceTypeDescription = occurrenceTypes.types.find(occurrenceType => occurrenceType.id === data.occurrenceType!)?.name!;
        this.km = data.km!;
        this.userId = data.userId!;
    }

    private validateRequiredData(data: Partial<Occurrence>): void {
        if (!data.registered_at) {
            throw new Error("Registered at is required");
        } else if (!data.local) {
            throw new Error("Local is required");
        } else if (!data.occurrenceType) {
            throw new Error("Occurrence Type is required");
        } else if (!data.km) {
            throw new Error("Km is required");
        }
    }
}