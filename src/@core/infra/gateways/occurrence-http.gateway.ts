import { OccurrenceGateway } from "@/@core/domain/gateways/occurence.gateway";
import { AxiosInstance } from "axios";
import { TokenStorage } from "../interfaces/token-storage";
import { Occurrence } from "@/@core/domain/entities/occurrence";


export class OccurrenceHttpGateway implements OccurrenceGateway {

    constructor(private http: AxiosInstance, private tokenStorage: TokenStorage) { }

    private returnAuthorizationConfig() {

        return {
            headers: {
                Authorization: `Bearer ${this.tokenStorage.getToken()}`
            },
        }
    }

    async create(data: Occurrence): Promise<Occurrence> {
            
        throw new Error("Method not implemented.");
    }

    async update(id: number, data: Occurrence): Promise<Occurrence> {
            
        throw new Error("Method not implemented.");
    }

    async getAll(): Promise<Occurrence[]> {
                
        const occurrences = await this.http.get<any[]>('/occurrences')
        .then(res => {
            return res.data.map(occurrence => new Occurrence({
                id: occurrence.id
                , date: occurrence.date
                , time: occurrence.time
                , local: occurrence.local
                , occurrenceType: occurrence.occurrence_type
                , km: occurrence.km
                , userId: occurrence.user_id 
            }));
        });

        return occurrences;
    }

    async getMany(filter: Partial<Occurrence>): Promise<Occurrence[]> {
                    
        throw new Error("Method not implemented.");
    }

    async delete(id: number): Promise<void> {

        throw new Error("Method not implemented.");
    }
}