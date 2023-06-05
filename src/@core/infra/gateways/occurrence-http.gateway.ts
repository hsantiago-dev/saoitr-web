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

        const body: any = {
            registered_at: data.registered_at
            , local: data.local
            , occurrence_type: data.occurrenceType
            , km: data.km
            , user_id: data.userId
        }
        
        return await this.http.post<any>('/occurrences', body, this.returnAuthorizationConfig())
        .then(res => {
            return new Occurrence({
                id: res.data.id
                , registered_at: res.data.registered_at
                , local: res.data.local
                , occurrenceType: res.data.occurrence_type
                , km: res.data.km
                , userId: res.data.user_id 
            });
        });
    } 

    async update(id: number, data: Occurrence): Promise<Occurrence> {
            
        throw new Error("Method not implemented.");
    }

    async getAll(): Promise<Occurrence[]> {
                
        const occurrences = await this.http.get<any[]>('/occurrences')
        .then(res => {
            return res.data.map(occurrence => new Occurrence({
                id: occurrence.id
                , registered_at: occurrence.registered_at
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