import { Occurrence } from "@/@core/domain/entities/occurrence";

interface CardOccurrenceProps {
  id: number;
  occurrenceType: string;
  date: string;
  time: string;
  local: string;
  km: number;
}

export default function CardOccurrence({ id, occurrenceType, date, time, local, km }: CardOccurrenceProps) {
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
              {date} {time}
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
        </div>
      </div>
    </>
  );
}