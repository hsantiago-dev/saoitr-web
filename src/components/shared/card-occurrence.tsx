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
          width: 190px;
          height: 254px;
          background-image: linear-gradient(163deg, #00ff75 0%, #3700ff 100%);
          border-radius: 20px;
          transition: all .3s;
        }
         
        .card2 {
          width: 190px;
          height: 254px;
          background-color: #1a1a1a;
          border-radius:;
          transition: all .2s;
        }
         
        .card2:hover {
          transform: scale(0.98);
          border-radius: 20px;
        }
         
        .card:hover {
          box-shadow: 0px 0px 30px 1px rgba(0, 255, 117, 0.30);
        }
        `}</style>
        <div className="bg-grey-900 px-5 py-6 rounded-lg border-2 border-grey-900 border-b-grey-800" key={id}>
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
    </>
  );
}