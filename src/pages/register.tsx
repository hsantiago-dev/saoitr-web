import Input from "@/components/shared/input";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Link from "next/link";
import { showToastLoading, updateToastLoading } from '../@core/infra/toast-notification'
import { useState } from "react";
import { SignUpUseCase } from "@/@core/app/sign-up.usecase";
import { Registry, container } from "@/@core/infra/container-registry";
import { md5 } from "@/@core/infra/md5";
import { useRouter } from "next/router";

const schema = yup
  .object()
  .shape({
    name: yup.string().required(),
    email: yup.string().required().email('must be a valid email'),
    password: yup.string().required().min(6, "must be at least 6 characters"),
    passwordConfirmation: yup.string().required().oneOf([yup.ref('password')], 'Passwords must match'),
  })
  .required();

export default function Login() {
  const { register, handleSubmit, formState: { errors }, } = useForm({
    resolver: yupResolver(schema),
  });

  const [ loading, setLoading ] = useState<boolean>(false);
  const router = useRouter();

  const signUp = async (data: any) => {
    
    setLoading(true);
    showToastLoading('Realizando cadastro...');
    
    const useCase = container.get<SignUpUseCase>(Registry.SignUpUseCase);

    try {

      const signUpParams = {
        name: data.name,
        email: data.email,
        password: md5(data.password)
      };

      const result = await useCase.execute(signUpParams);

      router.push("/login");
      updateToastLoading('Cadastro realizado com sucesso!', 'success');
    } catch (error: any) {
      
      if (error.response.status == 401)
        updateToastLoading('E-mail ou senha inválidos!', 'warning');
      else 
        updateToastLoading(error.message, 'error');
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <main className="flex h-screen flex-col items-center justify-center bg-grey-900 p-24">
      <div className="flex flex-col md:w-3/6">
        <h1 className="font-sans text-2xl font-bold text-white mb-4">
            Se cadastre para continuarmos.
        </h1>
        <div className="flex flex-col rounded-lg bg-grey-700 px-5 py-6">
            <form onSubmit={handleSubmit((d) => signUp(d))}
              className="flex flex-col space-y-5"
            >
              <Input title="Nome" type="text" register={register('name')} error={errors.name?.message as string | undefined}/>
              <Input title="E-mail" type="email" register={register('email')} error={errors.email?.message as string | undefined}/>
              <Input title="Senha" type="password" register={register('password')} error={errors.password?.message as string | undefined} />
              <Input title="Confirme sua senha" type="password" register={register('passwordConfirmation')} error={errors.passwordConfirmation?.message as string | undefined} />
              <button
                type="submit" 
                className="rounded-lg text-lg bg-green py-4 font-sans font-bold w-full text-grey-900"
                disabled={loading}
              >
                CADASTRAR
              </button>
            </form>
            <Link
                href={"/login"}
                className="flex justify-center text-blue mt-3"
            >
                <h1 className="font-sans text-lg font-medium underline">Voltar para o login</h1>
            </Link>
        </div>
      </div>
    </main>
  );
}
