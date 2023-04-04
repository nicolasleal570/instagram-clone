import { useForm, Controller } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { LoginFormValues } from '../../types/LoginFormValues';
import { InputField } from '../../components/InputField/InputField';
import { InputError } from '../../components/InputError/InputError';
import { Button } from '../../components/Button/Button';

export function LoginPage() {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitted },
  } = useForm<LoginFormValues>();

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    console.log(data);
  };

  return (
    <section className='grid h-screen w-full grid-cols-1 place-content-center bg-gray-200 px-8'>
      <h1 className='mb-6 block w-full border-b border-indigo-500 pb-3 text-center text-2xl font-bold text-gray-400'>
        Digital Tech Inc.
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col rounded border border-dashed border-indigo-400 bg-white p-10'
      >
        <div className='flex items-center'>
          <Controller
            control={control}
            name='username'
            rules={{
              required: 'Debes ingresar un nombre de usuario válido',
            }}
            render={({ field: { value, name, onChange } }) => (
              <InputField
                name={name}
                value={value ?? ''}
                onChange={onChange}
                hasErrors={!!errors.username?.message}
              />
            )}
          />

          <Button type='submit' disabled={!isValid && isSubmitted}>
            Entrar
          </Button>
        </div>

        <ErrorMessage
          errors={errors}
          name='username'
          render={({ message }) => <InputError message={message} />}
        />
      </form>
    </section>
  );
}
