import { useForm, Controller } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { ErrorMessage } from '@hookform/error-message';
import { AtSymbolIcon } from '@heroicons/react/24/solid';
import { joiResolver } from '@hookform/resolvers/joi';
import { InputField } from '../../components/InputField/InputField';
import { InputError } from '../../components/InputError/InputError';
import { Button } from '../../components/Button/Button';
import { registerSchema } from '../../lib/rules';
import { LOGIN_URL } from '../../lib/routes';
import { RegisterFormValues } from '../../types/RegisterFormValues';

export function RegisterPage() {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitted },
  } = useForm<RegisterFormValues>({
    resolver: joiResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormValues> = (data) => {
    console.log(data);
  };

  return (
    <div className='container grid h-screen w-full grid-cols-1 place-content-center px-8 md:mx-auto md:max-w-[400px]'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className='mb-2 block w-full text-center text-4xl font-semibold text-slate-900'>
          Digital Tech Inc.
        </h1>

        <p className='mb-10 block w-full text-center text-sm text-slate-600'>
          ¿Nuevo por aquí? Completa los campos y regístrate.
        </p>

        <div className='space-y-4'>
          <Controller
            control={control}
            name='name'
            render={({
              field: { value, name, onChange },
              fieldState: { invalid },
            }) => (
              <div>
                <InputField
                  name={name}
                  value={value ?? ''}
                  onChange={onChange}
                  hasErrors={invalid}
                  placeholder='John'
                />
                <ErrorMessage
                  errors={errors}
                  name={name}
                  render={({ message }) => <InputError message={message} />}
                />
              </div>
            )}
          />

          <Controller
            control={control}
            name='surname'
            render={({
              field: { value, name, onChange },
              fieldState: { invalid },
            }) => (
              <div>
                <InputField
                  name={name}
                  value={value ?? ''}
                  onChange={onChange}
                  hasErrors={invalid}
                  placeholder='Doe'
                />
                <ErrorMessage
                  errors={errors}
                  name={name}
                  render={({ message }) => <InputError message={message} />}
                />
              </div>
            )}
          />

          <Controller
            control={control}
            name='username'
            render={({
              field: { value, name, onChange },
              fieldState: { invalid },
            }) => (
              <div>
                <InputField
                  name={name}
                  value={value ?? ''}
                  onChange={onChange}
                  hasErrors={invalid}
                  placeholder='john_doe23'
                  leadIcon={<AtSymbolIcon className='h-5 w-5 text-inherit' />}
                />
                <ErrorMessage
                  errors={errors}
                  name={name}
                  render={({ message }) => <InputError message={message} />}
                />
              </div>
            )}
          />
        </div>

        <div className='mt-6 flex justify-center'>
          <Button type='submit' disabled={!isValid && isSubmitted}>
            Entrar
          </Button>
        </div>

        <Link
          to={LOGIN_URL}
          className='mt-4 block text-center text-sm text-slate-600'
        >
          Ya tienes una cuenta?{' '}
          <span className='text-indigo-500'>Inicia sesión aquí</span>
        </Link>
      </form>
    </div>
  );
}
