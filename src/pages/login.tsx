import Input from "@/components/shared/input";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect } from "react";

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

  useEffect(() => {
    console.log(errors);
  }, [errors]);
  
  return (
    <main className="flex h-screen flex-col items-center justify-center bg-gradient-to-r from-emerald-600 to-emerald-900 p-24">
      <div className="fixed top-6 left-6">
        arrow
      </div>
      <div className="flex h-full w-11/12 rounded-xl bg-teal-900 shadow-xl">
        <div className="flex flex-grow flex-col px-10 pt-10">
          <div className="flex">
            <h1 className="font-mono text-2xl font-extrabold tracking-widest text-secondary mb-10 ">
              Bem vindo de volta!
            </h1>
          </div>
          <form onSubmit={handleSubmit((d) => console.log(d))}
            className="flex flex-col space-y-6"
          >
            <Input title="E-mail" type="email" register={register('email')} error={errors.email?.message as string | undefined}/>
            <Input title="Senha" type="password" register={register('password')} error={errors.password?.message as string | undefined} />
            <button
              type="submit" 
              className="mt-5 rounded-2xl bg-emerald-600 px-4 py-4 font-sans font-semibold shadow hover:bg-teal-950 w-full"
            >
              ENTRAR
            </button>
          </form>
        </div>
        <div className="flex flex-grow flex-col items-center justify-center rounded-3xl bg-emerald-600 mx-4 my-4 space-y-4 shadow">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-36 w-36 animate-bounce"
          >
            <path
              fillRule="evenodd"
              d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
              clipRule="evenodd"
            />
          </svg>
          <h1 className="font-mono text-lg tracking-widest text-secondary">
            Ainda não tem conta?
          </h1>
          <button className="rounded-2xl bg-teal-950 px-4 py-4 font-sans font-semibold shadow hover:bg-emerald-500">
            CADASTRE-SE
          </button>
        </div>
      </div>
    </main>
  );
}
