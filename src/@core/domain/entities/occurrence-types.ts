import { Entity } from "../base/entity";

type OccurrenceType = {
    id: number;
    name: string;
}

export class OccurrenceTypes extends Entity {

    public types: OccurrenceType[] = [
        { id: 1, name: 'Atropelamento' }
        , { id: 2, name: 'Deslizamento' }
        , { id: 3, name: 'Colisão frontal' }
        , { id: 4, name: 'Capotagem' }
        , { id: 5, name: 'Saída de pista' }
        , { id: 6, name: 'Batida em objeto fixo' }
        , { id: 7, name: 'Veículo avariado' }
        , { id: 8, name: 'Colisão com motocicletas' }
        , { id: 9, name: 'Colisão no mesmo sentido ou transversal ' }
        , { id: 10, name: 'Construção' }
    ];

    public constructor() {
        super();
    }
}