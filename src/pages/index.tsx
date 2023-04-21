import Header from "@/components/header";
import { Occurrence } from "@/core/entities/occurrence";
import { OccurrenceInMemoryRepository } from "@/data/in-memory/occurrence-in-memory.gateway";
import { useState, } from "react";

export default function Home() {
  // const [occurrences, setOccurrences] = useState<Occurrence[]>([]);

  // const occurrenceRepository = new OccurrenceInMemoryRepository();

  // const getAllOccurrences = async () => {
  //   setOccurrences(await occurrenceRepository.getAll());
  // };

  return (
    <main className="flex h-screen flex-col items-start justify-center bg-grey-900 p-24">
      <Header />
      <div className="flex flex-col h-full w-full rounded-lg bg-grey-700 shadow-xl">
        {/* <button onClick={getAllOccurrences}>Buscar</button> */}

        {/* {occurrences.map((occurrence) => (
          <div>
            <span key={occurrence.id}>{occurrence.id} - {occurrence.local}</span>
            <br/>
          </div>
        ))} */}
      </div>
    </main>
  );
}
