import { GetAllOccurrencesUseCase } from "@/@core/app/occurrence/get-all-occurrences.usecase";
import { Occurrence } from "@/@core/domain/entities/occurrence";
import { Registry, container } from "@/@core/infra/container-registry";
import Header from "@/components/header";
import ModalNewOccurrence from "@/components/modal-new-occurrence";
import { UserContext } from "@/context/user.provider";
import { use, useContext, useEffect, useState } from "react";

export default function Home() {

  const [ occurrences, setOccurrences ] = useState<Occurrence[]>([]);
  const userContext = useContext(UserContext);

  useEffect(() => {
    getOccurrences();
  }, []);

  const getOccurrences = async () => {

    const useCase = container.get<GetAllOccurrencesUseCase>(Registry.GetAllOccurrencesUseCase);  

    try {

      const result = await useCase.execute();
      console.log(result);
      setOccurrences(result);
    } catch (error: any) {
      console.log(error);
    }
  }

  return (
    <main className="flex h-screen flex-col items-start justify-center bg-grey-900 p-16">
      <Header />
      <div className="flex flex-col overflow-auto  h-full w-full rounded-lg bg-grey-700 shadow-xl">
        <div className="grid grid-cols-2 gap-4 px-10 py-10">
          {occurrences.map(occurrence => (
            <div className="bg-grey-900 px-5 py-6 rounded-lg border-2 border-grey-900 border-b-grey-800" key={occurrence.id}>
              <div className="text-xl font-bold bg-grey-800 w-full text-center rounded-lg py-2 text-white/80 uppercase border-2 border-grey-700">
                {occurrence.occurrenceType}
              </div>
              <div className="flex mt-3 justify-between text-redLight text-lg">
                <span>
                  #{occurrence.id}
                </span>
                <span>
                  {occurrence.date} {occurrence.time}
                </span>
              </div>
              <div className="flex mt-3 justify-between text-lg">
                <span>
                  {occurrence.local}
                </span>
                <span>
                  Próximo ao KM {occurrence.km}
                </span>
              </div>
            </div>
          ))}
        </div>
        { userContext.user ? ( <ModalNewOccurrence /> ) : null }
      </div>
    </main>
  );
}
