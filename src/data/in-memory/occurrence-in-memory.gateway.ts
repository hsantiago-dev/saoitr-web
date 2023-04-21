import { Occurrence } from "@/core/entities/occurrence";
import { OccurrenceGateway } from "@/core/gateways/occurence.gateway";

export class OccurrenceInMemoryRepository implements OccurrenceGateway { 
    
    protected readonly items: Occurrence[];

    constructor() {
        this.items = [
            new Occurrence({
                id: 1,
                date: "2020-01-01",
                time: "12:00",
                local: "Rua 1",
                occurrenceType: "Acidente",
                km: 100,
                userId: 1
            }),
            new Occurrence({
                id: 2,
                date: "2020-01-02",
                time: "12:00",
                local: "Rua 2",
                occurrenceType: "Acidente",
                km: 200,
                userId: 1
            }),
        ];
    }

    public create(data: Occurrence): Promise<Occurrence> {
        data.id = this.getNewId();

        const lenght = this.items.push(data);

        return Promise.resolve(this.items[lenght - 1]);
    }

    public update(id: number, data: Occurrence): Promise<Occurrence> {
        const index = this.getIndexById(id);
        
        if (index === -1) {
            return Promise.reject(new Error(`Entity  with id ${id} not found`));
        }
        
        data.id = id;
        this.items[index] = data;
        
        return Promise.resolve(this.items[index]);
    }

    public getById(id: number): Promise<Occurrence> {
        const item = this.items.find(item => item.id === id);

        return Promise.resolve(item!);
    }

    public getAll(): Promise<Occurrence[]> {
        setTimeout(() => {}, 2000);
        
        return Promise.resolve(this.items);
    }

    public async getOne(filter: Partial<Occurrence>): Promise<Occurrence | null> {
        return await this.getMany(filter)
            .then(items => items.length > 0 ? items[0] : null);
    }

    public getMany(filter: Partial<Occurrence>): Promise<Occurrence[]> {
        let filtered = this.items;

        for (const key in filter) {
            filtered = filtered.filter(item => (item as any)[key] === (filter as any)[key]);
        }

        return Promise.resolve(filtered);
    }

    public delete(id: number): Promise<void> {
        const index = this.getIndexById(id);

        if (index === -1) {
            return Promise.reject(new Error(`Entity with id ${id} not found`));
        }

        this.items.splice(index, 1);

        return Promise.resolve();
    }

    private getIndexById(id: number): number {
        return this.items.findIndex(item => item.id === id);
    }

    private getNewId(): number {
        return this.items.length > 0 ? this.getLastId() + 1 : 1;
    }

    private getLastId(): number {
        return this.items.slice(-1)[0].id!;
    }
} 