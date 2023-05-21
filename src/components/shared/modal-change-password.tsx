import { useContext, useState } from "react";
import Input from "./input";
import { Registry, container } from "@/@core/infra/container-registry";
import { EditUserUseCase } from "@/@core/app/user/edit-user.usecase";
import { UserContext } from "@/context/user.provider";
import { showToastNotification } from "@/@core/infra/toast-notification";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { md5 } from "@/@core/infra/md5";
const schema = yup
  .object()
  .shape({
    password: yup.string().required().min(6, "must be at least 6 characters"),
    passwordConfirmation: yup.string().required().oneOf([yup.ref('password')], 'Passwords must match'),
  })
  .required();


export default function ModalChangePassword() {
  const { register, handleSubmit, formState: { errors }, } = useForm({
    resolver: yupResolver(schema),
  });

  const [ showModal, setShowModal ] = useState<boolean>(false);
  const userContext = useContext(UserContext);

  const updatePassword = async (data: any) => {
      
    const useCase = container.get<EditUserUseCase>(Registry.EditUserUseCase);
  
    try {

      const updateParams: any = {
        name: userContext.user?.name,
        email: userContext.user?.email,
        password: md5(data.password)
      };
  
      const result = await useCase.execute(userContext.user?.id!, updateParams);
      
      userContext.setUser(result);

      showToastNotification('Atualização realizada!', 'success');
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
      <button
        type="button" 
        onClick={() => setShowModal(true)}
        className="rounded-lg text-lg bg-purple py-4 font-sans font-bold w-full text-grey-800"
      >
        ALTERAR A SENHA
      </button>
      { showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-grey-900/70">
            <div className="relative w-2/6 my-6 mx-auto max-w-3xl">
              <div className="rounded-lg shadow-lg relative flex flex-col w-full bg-grey-700 outline-none focus:outline-none py-6">
                <div className="flex items-start justify-between px-6 pb-5">
                  <h3 className="text-3xl font-semibold">Altere sua senha</h3>
                  <button
                    className="float-right text-red"
                    onClick={() => setShowModal(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                      <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <form onSubmit={handleSubmit((d) => updatePassword(d))} className="rounded px-6 w-full flex flex-col space-y-6">
                  <Input 
                    title="Senha" 
                    type="password" 
                    register={register('password')} 
                    error={errors.password?.message as string | undefined} 
                  />
                  <Input 
                    title="Confirme sua senha" 
                    type="password" 
                    register={register('passwordConfirmation')} 
                    error={errors.passwordConfirmation?.message as string | undefined} 
                  />
                  <button
                    type="submit" 
                    // onClick={() => setShowModal(false)}
                    className="rounded-lg text-lg bg-purple py-4 font-sans font-bold w-full text-grey-800"
                  >
                    SALVAR
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