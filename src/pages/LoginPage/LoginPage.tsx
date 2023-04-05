import { useForm, Controller } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { ErrorMessage } from '@hookform/error-message';
import { AtSymbolIcon } from '@heroicons/react/24/solid';
import { LoginFormValues } from '../../types/LoginFormValues';
import { InputField } from '../../components/InputField/InputField';
import { InputError } from '../../components/InputError/InputError';
import { Button } from '../../components/Button/Button';
import { loginSchema } from '../../lib/rules';
import { joiResolver } from '@hookform/resolvers/joi';
import { FEED_URL, REGISTER_URL } from '../../lib/routes';
import { useAuth } from '../../hooks/useAuth';
import { NotificationKind, useNotify } from '../../hooks/useNotify';
import {
  USER_NOT_FOUND,
  UserErrors,
  isUserError,
  userErrors,
} from '../../lib/errors';

export function LoginPage() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    setError,
    control,
    formState: { errors, isValid, isSubmitted, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: joiResolver(loginSchema),
  });

  const { login } = useAuth();
  const { notify } = useNotify();

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    try {
      const res = await login(data.username);

      notify(NotificationKind.Success, `Hola de nuevo, ${res.name}!`);

      navigate(FEED_URL);
    } catch (error) {
      if (isUserError(error)) {
        const formatError = error as Error;

        if (formatError.message === USER_NOT_FOUND) {
          setError('username', {
            message: userErrors[formatError.message as keyof UserErrors](
              data.username
            ),
          });
        }

        return;
      }

      notify(
        NotificationKind.Error,
        'Sucedió algo inesperado. Intenta de nuevo'
      );
    }
  };

  return (
    <div className='container grid h-screen w-full grid-cols-1 place-content-center md:mx-auto md:max-w-[400px]'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className='mb-2 block w-full text-center text-4xl font-semibold text-slate-900'>
          Digital Tech Inc.
        </h1>

        <p className='mb-10 block w-full text-center text-sm text-slate-600'>
          Bienvenido! Ingresa utilizando tu nombre de usuario
        </p>

        <Controller
          control={control}
          name='username'
          render={({ field: { value, name, onChange } }) => (
            <>
              <InputField
                name={name}
                value={value ?? ''}
                onChange={onChange}
                hasErrors={!!errors.username?.message}
                placeholder='john_doe23'
                leadIcon={<AtSymbolIcon className='h-5 w-5 text-inherit' />}
                disabled={isSubmitting}
              />
              <ErrorMessage
                errors={errors}
                name={name}
                render={({ message }) => <InputError message={message} />}
              />
            </>
          )}
        />

        <div className='mt-6 flex justify-center'>
          <Button type='submit' disabled={!isValid && isSubmitted}>
            Entrar
          </Button>
        </div>

        {!isSubmitting && (
          <Link
            to={REGISTER_URL}
            className='mt-4 block text-center text-sm text-slate-600'
          >
            ¿No tienes una cuenta?{' '}
            <span className='text-indigo-500'>Regístarte aquí</span>
          </Link>
        )}
      </form>
    </div>
  );
}
