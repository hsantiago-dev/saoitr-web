import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import EditableField from '@/components/shared/editable_field';
import { useRouter } from 'next/router';

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

  const router = useRouter();

  // setValue('name', 'Teste');

  const [ loading, setLoading ] = useState<boolean>(false);

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
              Perfil
            </h1>
          </div>
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