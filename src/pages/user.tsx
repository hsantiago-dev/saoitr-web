import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import EditableField from '@/components/shared/editable_field';

const schema = yup
  .object()
  .shape({
    name: yup.string().required(),
    email: yup.string().required().email('must be a valid email')
  })
  .required();

export default function User() {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: 'Henrick Santiago',
      email: 'henrick@mail.com'
    }
  });

  // setValue('name', 'Teste');

  const [ loading, setLoading ] = useState<boolean>(false);

    return (
      <main className="flex h-screen flex-col items-center justify-center bg-grey-900">
        <div className="flex flex-col md:w-3/6">
          <h1 className="font-sans text-2xl font-bold text-white mb-4">
            Perfil!
          </h1>
          <div className="flex flex-col rounded-lg bg-grey-700 px-5 py-6">
            <div
              className='w-40 h-40 rounded-full bg-green/20 mb-4 self-center flex justify-center items-center text-green'
            >
              <div
                className='w-32 h-32 rounded-full bg-green/40 self-center flex justify-center items-center text-white/90'
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
            </div>
            <form onSubmit={handleSubmit((d) => console.log(d))}
              className="flex flex-col space-y-5"
            >
              <EditableField 
                title="Nome" 
                type="text" 
                register={register('name')} 
                error={errors.name?.message as string | undefined}
                value='Henrick Santiago'
              />
              <EditableField 
                title="E-mail" 
                type="email" 
                register={register('email')} 
                error={errors.email?.message as string | undefined}
                value='henrick@mail.com'
              />
              <button
                type="submit" 
                className="rounded-lg text-lg bg-green/40 py-4 font-sans font-bold w-full text-white"
                disabled={loading}
              >
                ALTERAR A SENHA
              </button>
            </form>
        </div>
        </div>
      </main> 
    );
}