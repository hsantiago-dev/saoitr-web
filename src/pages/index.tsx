import { GetAllOccurrencesUseCase } from "@/@core/app/occurrence/get-all-occurrences.usecase";
import { Occurrence } from "@/@core/domain/entities/occurrence";
import { Registry, container } from "@/@core/infra/container-registry";
import Header from "@/components/header";
import { use, useEffect, useState } from "react";

export default function Home() {

  const [ occurrences, setOccurrences ] = useState<Occurrence[]>([]);

  useEffect(() => {
    getOccurrences();
  }, []);

  const getOccurrences = async () => {

    const useCase = container.get<GetAllOccurrencesUseCase>(Registry.GetAllOccurrencesUseCase);  

    try {

      const result = await useCase.execute();
      setOccurrences(result);
    } catch (error: any) {
      console.log(error);
    }
  }

  return (
    <main className="flex h-screen flex-col items-start justify-center bg-grey-900 p-16">
      <Header />
      <div className="flex flex-col h-full w-full rounded-lg bg-grey-700 shadow-xl">
        <div className="flex px-10 py-10 space-x-5">
          {occurrences.map(occurrence => (
            <div className="bg-grey-900 px-5 py-5 rounded-xl" key={occurrence.id}>{occurrence.local}</div>
          ))}
        </div>
      </div>
    </main>
  );
}
