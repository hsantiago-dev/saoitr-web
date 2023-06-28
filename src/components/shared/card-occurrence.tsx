import Image from "next/image";

interface CardOccurrenceProps {
  id: number;
  occurrenceType: string;
  registered_at: string;
  local: string;
  km: number;
  editable?: boolean;
  onEdit?: any;
  onDelete?: any;
}

export default function CardOccurrence({ id, occurrenceType, registered_at, local, km, editable, onEdit, onDelete}: CardOccurrenceProps) {

  const dataFormatada = () => {

    let date: string = registered_at.split('T')[0];
    let time: string = registered_at.split('T')[1].substring(0, 5);

    date = date.split('-')[2] + '/' + date.split('-')[1] + '/' + date.split('-')[0];

    return date + ' ' + time;
  }

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

        .loader {
          width: 20px;
          height: 20px;
          position: relative;
          transform: rotate(45deg);
        }
        
        .loader:before,
        .loader:after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 50% 50% 0 50%;
          background: #0000;
          background-image: radial-gradient(circle 11.2px at 50% 50%,#0000 20%, #ff4747);
        }
        
        .loader:after {
          animation: pulse-ytk0dhmd 1s infinite;
          transform: perspective(336px) translateZ(0px);
        }
        
        @keyframes pulse-ytk0dhmd {
          to {
            transform: perspective(336px) translateZ(168px);
            opacity: 0;
          }
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
              {dataFormatada()}
            </span>
          </div>
          <div className="flex mt-3 justify-between text-lg">
            <div className="flex">
              <div className="loader mr-4"></div>
              <span>
                {local}
              </span>
            </div>
            <span>
              Próximo ao KM {km}
            </span>
          </div>
          <div className="rounded-lg w-full overflow-hidden mt-3 h-11">
            <Image 
              unoptimized 
              src="/imgs/google-maps.png"
              width={700}
              height={100}
              alt="Google Maps"
            />
          </div>
          {editable && (
            <div className="flex mt-5 justify-space-around">
              <button 
                onClick={onEdit}
                className="bg-blue text-grey-900 px-3 py-1 rounded-lg hover:bg-blue/80 transition-all duration-200 grow mr-2 text-lg font-bold"
              >
                EDITAR
              </button>
              <button 
                onClick={onDelete}
                className="bg-red text-white/80 px-3 py-2 rounded-lg hover:bg-red/80 transition-all duration-200 grow ml-2 text-lg font-bold"
              >
                EXCLUIR
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}