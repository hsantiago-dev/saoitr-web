import Input from "@/components/shared/input";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Link from "next/link";
import { UserContext } from "@/context/user.provider";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { SignInUseCase } from "../@core/app/user/sign-in.usecase";
import { showToastLoading, updateToastLoading } from '../@core/infra/toast-notification'
import { Registry, container } from "@/@core/infra/container-registry";
import { md5 } from "@/@core/infra/md5";

const schema = yup
  .object()
  .shape({
    email: yup.string().required().email('must be a valid email'),
    password: yup.string().required().min(6, "must be at least 6 characters"),
  })
  .required();

export default function Login() {
  const { register, handleSubmit, formState: { errors }, } = useForm({
    resolver: yupResolver(schema),
  });

  const userContext = useContext(UserContext);
  const router = useRouter();
  const [ loading, setLoading ] = useState<boolean>(false);

  const signIn = async (data: any) => {

    setLoading(true);
    showToastLoading('Realizando login...');
    
    const useCase = container.get<SignInUseCase>(Registry.SignInUseCase);

    try {

      const passwordMd5 = md5(data.password);

      const result = await useCase.execute(data.email, passwordMd5);

      userContext.setUser(result);

      router.push("/");
      updateToastLoading('Login realizado com sucesso!', 'success');
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
    <main className="flex h-screen flex-col items-center justify-center bg-grey-900">
      <div className="flex flex-col md:w-3/6">
        <div className='flex items-start'>
          <button className='text-redLight' onClick={() => router.push("/") }>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
              <path d="M5.566 4.657A4.505 4.505 0 016.75 4.5h10.5c.41 0 .806.055 1.183.157A3 3 0 0015.75 3h-7.5a3 3 0 00-2.684 1.657zM2.25 12a3 3 0 013-3h13.5a3 3 0 013 3v6a3 3 0 01-3 3H5.25a3 3 0 01-3-3v-6zM5.25 7.5c-.41 0-.806.055-1.184.157A3 3 0 016.75 6h10.5a3 3 0 012.683 1.657A4.505 4.505 0 0018.75 7.5H5.25z" />
            </svg>
          </button>
          <h1 className="font-sans text-xl font-bold text-grey-700 mx-2">|</h1>
          <h1 className="font-sans text-2xl font-bold text-white mb-4">
            Login
          </h1>
        </div>
        <div className="flex flex-col rounded-xl bg-grey-700 px-5 py-6">
          <form onSubmit={handleSubmit((data) => signIn(data))}
            className="flex flex-col space-y-6"
          >
            <Input title="E-mail" type="email" register={register('email')} error={errors.email?.message as string | undefined}/>
            <Input title="Senha" type="password" register={register('password')} error={errors.password?.message as string | undefined} />
            <button
              type="submit" 
              className="rounded-lg bg-green py-4 font-sans font-bold w-full text-lg text-grey-900"
              disabled={loading}
            >
              ENTRAR
            </button>
          </form>
          <Link
            href={"/register"}
            className="flex justify-center mt-3 text-blue"
          >
            <h1 className="font-sans text-lg font-medium underline">Não tem uma conta? Cadastre-se</h1>
          </Link>
        </div>
      </div>
    </main>
  );
}
