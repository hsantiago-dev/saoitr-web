import { GetAllOccurrencesByUserUseCase } from "@/@core/app/occurrence/get-all-occurrences-by-user.usecase";
import { GetAllOccurrencesUseCase } from "@/@core/app/occurrence/get-all-occurrences.usecase";
import { Occurrence } from "@/@core/domain/entities/occurrence";
import { Registry, container } from "@/@core/infra/container-registry";
import Header from "@/components/header";
import ModalEditOccurrence from "@/components/modal-edit-occurrence";
import ModalNewOccurrence from "@/components/modal-new-occurrence";
import CardOccurrence from "@/components/shared/card-occurrence";
import { UserContext } from "@/context/user.provider";
import { useContext, useEffect, useState } from "react";
import { set } from "react-hook-form";

export default function MyOccurrences() {

  const [ occurrences, setOccurrences ] = useState<Occurrence[]>([]);
  const userContext = useContext(UserContext);
  const [ showModalEdit, setShowModalEdit ] = useState<boolean>(false);
  const [ occurrenceToEdit, setOccurrenceToEdit ] = useState<Occurrence>();

  useEffect(() => {
    getOccurrences();
  }, []);

  const getOccurrences = async () => {

    const useCase = container.get<GetAllOccurrencesByUserUseCase>(Registry.GetAllOccurrencesByUserUseCase);  

    try {

      const result = await useCase.execute(userContext.user?.id!);
      
      setOccurrences(result);
    } catch (error: any) {
      console.error(error);
    }
  }

  return (
    <main className="flex h-screen flex-col items-start justify-center bg-grey-900 p-10">
      <Header page="/my-occurrences" />
      <div className="flex flex-col justify-between h-full w-full rounded-lg bg-grey-700 shadow-xl">
        <div className="overflow-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 px-5 py-5">
            {occurrences.map(occurrence => (
              <CardOccurrence 
                key={occurrence.id}
                id={occurrence.id!}
                occurrenceType={occurrence.occurrenceTypeDescription}
                registered_at={occurrence.registered_at}
                local={occurrence.local}
                km={occurrence.km}
                editable={true}
                onEdit={() => {
                  setOccurrenceToEdit(occurrence);
                  setShowModalEdit(true);
                }}
              />
            ))}
          </div>
        </div>
        { showModalEdit ? (
          <>
            <ModalEditOccurrence 
              occurrence={occurrenceToEdit!}
              closeModal={() => {
                setShowModalEdit(false);
              }}
              eventRefreshOccurrences={function eventRefreshOccurrences() { getOccurrences() }}
            />
          </>
        ) : null }
        <div className="flex justify-end pr-10 py-3">
          { userContext.user?.name ? ( <ModalNewOccurrence eventRefreshOccurrences={function eventRefreshOccurrences() { getOccurrences() }} /> ) : null }
        </div>
      </div>
    </main>
  );
}
