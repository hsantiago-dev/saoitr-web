import { useState } from "react";
import Input from "./shared/input";


export default function ModalNewOccurrence() {

  const [ showModal, setShowModal ] = useState<boolean>(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-10 right-10 bg-redLight rounded-full shadow-xl p-4 text-grey-900 flex items-center justify-center space-x-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
          <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
        </svg>
        <span className="text-lg font-bold">Ocorrência</span>
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
                <form className="rounded px-6 w-full flex flex-col space-y-3">
                  <Input 
                    title="Tipo de ocorrência"  
                    type="text"
                    register={{ required: true }}
                  />
                  <div className="grid grid-cols-4 space-x-3">
                    <div className="col-span-3">
                      <Input 
                        title="Local"  
                        type="text"
                        register={{ required: true }}
                      />
                    </div>
                    <Input 
                      title="KM"
                      type="number"
                      register={{ required: true }}
                    />
                  </div>
                  <div className="grid grid-cols-2 space-x-3">
                    <Input 
                      title="Data da ocorrência"
                      type="date"
                      register={{ required: true }}
                    />
                    <Input 
                      title="Hora da ocorrência"
                      type="time"
                      register={{ required: true }}
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