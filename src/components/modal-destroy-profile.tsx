import { useContext, useState } from "react";
import { Registry, container } from "@/@core/infra/container-registry";
import { UserContext } from "@/context/user.provider";
import { showToastNotification } from "@/@core/infra/toast-notification";
import { DestroyUserUseCase } from "@/@core/app/user/destroy-user.usecase";
import { useRouter } from "next/router";


export default function ModalDestroyProfile() {

  const [ showModal, setShowModal ] = useState<boolean>(false);
  const userContext = useContext(UserContext);
  const router = useRouter();

  const destroyProfile = async () => {
      
    const useCase = container.get<DestroyUserUseCase>(Registry.DestroyUserUseCase);
  
    try {
  
      await useCase.execute(userContext.user?.id!);

      userContext.setUser(null);
      showToastNotification('Perfil excluído com sucesso.', 'info');
      setShowModal(false);
      router.push('/');
    } catch (error: any) {
        
      showToastNotification(error.message, 'error');
    }
  }

  return (
    <>
      <button
        type="button" 
        onClick={() => setShowModal(true)}
        className="rounded-lg text-lg py-4 font-sans font-bold w-full text-red"
      >
        EXCLUIR PERFIL
      </button>
      { showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-grey-900/70">
            <div className="relative w-2/6 my-6 mx-auto max-w-3xl">
              <div className="rounded-lg shadow-lg relative flex flex-col w-full bg-grey-700 outline-none focus:outline-none py-6">
                <div className="flex flex-col items-start justify-between px-6 pb-5">
                  <h3 className="text-3xl font-semibold">Tem certeza que deseja <span className="text-red">excluir</span> seu perfil?</h3>
                  <p className="text-red text-lg mt-4 self-center">Essa ação não poderá ser desfeita!</p>
                </div>
                <div className="flex px-6 space-x-2">
                  <button
                    type="submit" 
                    onClick={() => destroyProfile()}
                    className="rounded-lg text-lg bg-red py-4 font-sans font-bold w-full text-white"
                  >
                    EXCLUIR
                  </button>
                  <button
                    type="submit" 
                    onClick={() => setShowModal(false)}
                    className="rounded-lg text-lg bg-green py-4 font-sans font-bold w-full text-white"
                  >
                    VOLTAR
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>  
      ) : null}
    </>
  );
}