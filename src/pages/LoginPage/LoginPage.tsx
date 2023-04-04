import { useForm, Controller } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { AtSymbolIcon } from '@heroicons/react/24/solid';
import { LoginFormValues } from '../../types/LoginFormValues';
import { InputField } from '../../components/InputField/InputField';
import { InputError } from '../../components/InputError/InputError';
import { Button } from '../../components/Button/Button';
import { loginSchema } from '../../lib/rules';
import { joiResolver } from '@hookform/resolvers/joi';

export function LoginPage() {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitted },
  } = useForm<LoginFormValues>({
    resolver: joiResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    console.log(data);
  };

  return (
    <section className='h-screen w-full bg-gray-200'>
      <div className='container grid h-full w-full grid-cols-1 place-content-center px-8 md:mx-auto md:w-3/6 xl:w-2/6'>
        <h1 className='mb-6 block w-full border-b border-indigo-500 pb-3 text-center text-2xl font-bold text-gray-400'>
          Digital Tech Inc.
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col items-center rounded border border-dashed border-indigo-400 bg-white p-10'
        >
          <div className='flex items-center'>
            <Controller
              control={control}
              name='username'
              render={({ field: { value, name, onChange } }) => (
                <InputField
                  name={name}
                  value={value ?? ''}
                  onChange={onChange}
                  hasErrors={!!errors.username?.message}
                  placeholder='john_doe23'
                  leadIcon={<AtSymbolIcon className='h-5 w-5 text-inherit' />}
                />
              )}
            />

            <Button type='submit' disabled={!isValid && isSubmitted}>
              Entrar
            </Button>
          </div>

          <div className='w-full'>
            <ErrorMessage
              errors={errors}
              name='username'
              render={({ message }) => <InputError message={message} />}
            />
          </div>
        </form>
      </div>
    </section>
  );
}
