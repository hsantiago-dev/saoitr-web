import { Entity } from "../base/entity";

export class Occurrence extends Entity {
    public date: string;
    public time: string;
    public local: string;
    public occurrenceType: string;
    public km: number;
    public userId: number;

    public constructor(data: Partial<Occurrence>) {
        super();

        this.validateRequiredData(data);
        
        this.id = data.id;
        this.date = data.date!;
        this.time = data.time!;
        this.local = data.local!;
        this.occurrenceType = data.occurrenceType!;
        this.km = data.km!;
        this.userId = data.userId!;
    }

    private validateRequiredData(data: Partial<Occurrence>): void {
        if (!data.date) {
            throw new Error("Date is required");
        } else if (!data.time) {
            throw new Error("Time is required");
        } else if (!data.local) {
            throw new Error("Local is required");
        } else if (!data.occurrenceType) {
            throw new Error("Occurrence Type is required");
        } else if (!data.km) {
            throw new Error("Km is required");
        } else if (!data.userId) {
            throw new Error("ContributorID is required");
        } 
    }
}