import { useContext, useEffect, useState } from "react";
import Input from "./shared/input";
import Select from "./shared/select";
import { OccurrenceTypes } from "@/@core/domain/entities/occurrence-types";
import { Registry, container } from "@/@core/infra/container-registry";
import { CreateNewOccurrenceUseCase } from "@/@core/app/occurrence/create-new-occurrence.usecase";
import { Occurrence } from "@/@core/domain/entities/occurrence";
import { showToastNotification } from "@/@core/infra/toast-notification";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { UserContext } from "@/context/user.provider";
import Image from "next/image";

const schema = yup
  .object()
  .shape({
    local: yup.string().required().min(3, "must be at least 3 characters"),
    occurrence_type: yup.number().required().typeError('must be a valid occurrence type'),
    km: yup.number().required(),
    date: yup.string().required().typeError('must be a valid date'),
    time: yup.string().required().typeError('must be a valid time'),
  })
  .required();

type ModalEditOccurrenceProps = {
    occurrence: Occurrence;
    closeModal: any;
    eventRefreshOccurrences: any;
}

export default function ModalEditOccurrence({ occurrence, closeModal, eventRefreshOccurrences } : ModalEditOccurrenceProps) {

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  const occurrenceTypes = new OccurrenceTypes();

  const userContext = useContext(UserContext);

  useEffect(() => {
    setValue('local', occurrence.local);
    setValue('occurrence_type', occurrence.occurrenceType);
    setValue('km', occurrence.km);
    setValue('date', occurrence.registered_at.split('T')[0]);
    setValue('time', occurrence.registered_at.split('T')[1].split('.')[0]);
  }, []);

  useEffect(() => {
    setValue('local', occurrence.local);
    setValue('occurrence_type', occurrence.occurrenceType);
    setValue('km', occurrence.km);
    setValue('date', occurrence.registered_at.split('T')[0]);
    setValue('time', occurrence.registered_at.split('T')[1].split('.')[0]);
  }, [occurrence]);

  const editOccurrence = async (data: any) => {

    const useCase = container.get<CreateNewOccurrenceUseCase>(Registry.CreateNewOccurrenceUseCase);

    const occurrence = new Occurrence({
      registered_at: data.date + 'T' + data.time + ':00.000Z',
      local: data.local,
      occurrenceType: data.occurrence_type,
      km: data.km,
      userId: userContext.user?.id,
    });

    try {

      const result = await useCase.execute(occurrence);

      showToastNotification('Ocorrência registrada com sucesso!', 'success');
      setValue('local', '');
      setValue('occurrence_type', '');
      setValue('km', 1);
      setValue('date', '');
      setValue('time', '');
      closeModal();
      eventRefreshOccurrences();
    } catch (error: any) {
      
      console.error(error);
      if (error.response.status == 400)
        showToastNotification('Campo não é valido.', 'warning');
      else 
        showToastNotification(error.message, 'error');
    }
  }

  return (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-grey-900/70">
            <div className="relative w-3/6 my-6 mx-auto max-w-3xl">
              <div className="rounded-lg shadow-lg relative flex flex-col w-full bg-grey-700 outline-none focus:outline-none py-6">
                <div className="flex items-start justify-between px-6 pb-5">
                  <h3 className="text-3xl font-semibold">Ocorrência <span className="text-redLight">#{occurrence.id}</span></h3>
                  <button
                    className="float-right text-red"
                    onClick={() => closeModal()}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                      <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <form 
                  className="rounded px-6 w-full flex flex-col space-y-3"
                  onSubmit={handleSubmit(() => {})}  
                >
                  <div className="rounded-lg w-full overflow-hidden h-11">
                    <Image 
                      unoptimized 
                      src="/imgs/google-maps.png"
                      width={700}
                      height={100}
                      alt="Google Maps"
                    />
                  </div>
                  <Select 
                    title="Tipo de ocorrência"
                    options={
                      occurrenceTypes.types.map((type) => {
                          return {
                            value: type.id,
                            label: type.name
                          }
                        }
                      )
                    }
                    register={register('occurrence_type')}
                    error={errors.occurrence_type?.message as string | undefined}
                  />
                  <div className="grid grid-cols-4 space-x-3">
                    <div className="col-span-3">
                      <Input 
                        title="Local"  
                        type="text"
                        register={register('local')}
                        error={errors.local?.message as string | undefined}
                      />
                    </div>
                    <Input 
                      title="KM"
                      type="number"
                      register={register('km')}
                      error={errors.km?.message as string | undefined}
                    />
                  </div>
                  <div className="grid grid-cols-2 space-x-3">
                    <Input 
                      title="Data da ocorrência"
                      type="date"
                      register={register('date')}
                      error={errors.date?.message as string | undefined}
                    />
                    <Input 
                      title="Hora da ocorrência"
                      type="time"
                      register={register('time')}
                      error={errors.date?.message as string | undefined}
                    />
                  </div>
                  <button
                    type="submit" 
                    className="rounded-lg text-lg bg-blue py-4 font-sans font-bold w-full text-grey-900"
                  >
                    ALTERAR
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>  
      )
}