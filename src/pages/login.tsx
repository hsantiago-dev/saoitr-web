import Input from "@/components/shared/input";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Link from "next/link";
import { UserContext } from "@/context/user.provider";
import { useContext } from "react";
import { User } from "@/core/entities/user";
import { useRouter } from "next/router";

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

  const signIn = (data: any) => {
    const user = new User({
      id: 1,
      name: "Henrick Santiago",
      email: data.email,
    });

    userContext.setUser(user);

    router.push("/");
  }
  
  return (
    <main className="flex h-screen flex-col items-center justify-center bg-grey-900 p-24">
      <div className="flex flex-col md:w-3/6">
        <h1 className="font-sans text-xl font-bold text-white mb-4">
          Bem vindo de volta!
        </h1>
        <div className="flex flex-col rounded-xl bg-grey-700 px-5 py-6">
          <form onSubmit={handleSubmit((data) => signIn(data))}
            className="flex flex-col space-y-6"
          >
            <Input title="E-mail" type="email" register={register('email')} error={errors.email?.message as string | undefined}/>
            <Input title="Senha" type="password" register={register('password')} error={errors.password?.message as string | undefined} />
            <button
              type="submit" 
              className="rounded-lg bg-green px-4 py-4 font-sans font-bold w-full text-grey-900"
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
