import { Occurrence } from "@/@core/domain/entities/occurrence";

interface CardOccurrenceProps {
  id: number;
  occurrenceType: string;
  registered_at: string;
  local: string;
  km: number;
  editable?: boolean;
}

export default function CardOccurrence({ id, occurrenceType, registered_at, local, km, editable }: CardOccurrenceProps) {
  return (
    <>
      <style jsx>{`
        .card {
          background-image: linear-gradient(163deg, #FF9B85 0%, #EE6055 100%);
          border-radius: 0.6rem;
          transition: all .3s;
        }
         
        .card2 {
          border-radius: 0.5rem;
          transition: all .2s;
        }
         
        .card2:hover {
          transform: scale(0.98);
          border-radius: 0.5rem;
        }
         
        .card:hover {
          box-shadow: 0px 0px 1px 1px rgba(255, 155, 133, 0.30);
        }
      `}</style>
      <div className="card">
        <div className="bg-grey-900 px-5 py-6 rounded-lg border-2 border-grey-900 border-b-grey-800 card2" key={id}>
          <div className="text-xl font-bold bg-grey-800 w-full text-center rounded-lg py-2 text-white/80 uppercase border-2 border-grey-700">
            {occurrenceType}
          </div>
          <div className="flex mt-3 justify-between text-redLight text-lg">
            <span>
              #{id}
            </span>
            <span>
              {registered_at}
            </span>
          </div>
          <div className="flex mt-3 justify-between text-lg">
            <span>
              {local}
            </span>
            <span>
              Próximo ao KM {km}
            </span>
          </div>
          {editable && (
            <div className="flex mt-3 justify-space-around">
              <button 
                className="bg-blue text-grey-900 px-3 py-1 rounded-lg hover:bg-blue/80 transition-all duration-200 grow mx-2 text-lg font-bold"
              >
                EDITAR
              </button>
              <button className="bg-red text-white/80 px-3 py-2 rounded-lg hover:bg-red/80 transition-all duration-200 grow mx-2 text-lg font-bold">
                EXCLUIR
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}