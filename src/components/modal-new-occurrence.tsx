import { useEffect, useState } from "react";
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

export default function ModalNewOccurrence() {

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  const [ showModal, setShowModal ] = useState<boolean>(false);

  const occurrenceTypes = new OccurrenceTypes();

  useEffect(() => {
    setValue('km', 1);
  }, []);

  const createNewOccurrence = (data: any) => {

    const useCase = container.get<CreateNewOccurrenceUseCase>(Registry.CreateNewOccurrenceUseCase);

    const occurrence = new Occurrence({
      registered_at: data.date + ' ' + data.time + ':00',
      local: data.local,
      occurrenceType: data.occurrence_type,
      km: data.km,
      userId: 1,
    });

    try {

      const result = useCase.execute(occurrence);

      console.log(result)

      showToastNotification('Ocorrência registrada com sucesso!', 'success');
      setValue('local', '');
      setValue('occurrence_type', '');
      setValue('km', 1);
      setValue('date', '');
      setValue('time', '');
      setShowModal(false);
    } catch (error: any) {
      
      if (error.response.status == 400)
        showToastNotification('Campo não é valido.', 'warning');
      else 
        showToastNotification(error.message, 'error');
    }
  }

  return (
    <>
      <style jsx>{`
        .button {
          position: relative;
          overflow: hidden;
          height: 3rem;
          padding: 0 2rem;
          border-radius: 1.5rem;
          background: #181E24;
          background-size: 400%;
          // color: #fff;
          border: none;
        }
        
        .button:hover::before {
          transform: scaleX(1);
        }
        
        .button-content {
          position: relative;
          z-index: 1;
        }
        
        .button::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          transform: scaleX(0);
          transform-origin: 0 50%;
          width: 100%;
          height: inherit;
          border-radius: inherit;
          background: linear-gradient(
            82.3deg,
            rgba(255, 155, 133, 1) 10.8%,
            rgba(238, 96, 85, 1) 94.3%
          );
          transition: all 0.475s;
        }
      `}</style>
      <button
        onClick={() => setShowModal(true)}
        className="button bg-redLight rounded-full shadow-xl p-4 text-white flex items-center justify-center space-x-2 hover:text-grey-900"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 button-content">
          <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
        </svg>
        <span className="text-lg font-bold button-content">Ocorrência</span>
      </button>
      { showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-grey-900/70">
            <div className="relative w-3/6 my-6 mx-auto max-w-3xl">
              <div className="rounded-lg shadow-lg relative flex flex-col w-full bg-grey-700 outline-none focus:outline-none py-6">
                <div className="flex items-start justify-between px-6 pb-5">
                  <h3 className="text-3xl font-semibold">Nova ocorrência</h3>
                  <button
                    className="float-right text-red"
                    onClick={() => setShowModal(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                      <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <form 
                  className="rounded px-6 w-full flex flex-col space-y-3"
                  onSubmit={handleSubmit(createNewOccurrence)}  
                >
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
                  <div className="grid grid-cols-2">
                    
                  </div>
                  <button
                    type="submit" 
                    // onClick={() => setShowModal(false)}
                    className="rounded-lg text-lg bg-redLight py-4 font-sans font-bold w-full text-grey-900"
                  >
                    ENVIAR
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>  
      ) : null}
    </>
  );
}