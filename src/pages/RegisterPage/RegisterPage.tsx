import { useForm, FormProvider } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { joiResolver } from '@hookform/resolvers/joi';
import { Button } from '../../components/Button/Button';
import { registerSchema } from '../../lib/rules';
import { FEED_URL, LOGIN_URL } from '../../lib/routes';
import { RegisterFormValues } from '../../types/RegisterFormValues';
import { User } from '../../types/models';
import { useAuth } from '../../hooks/useAuth';
import { NotificationKind, useNotify } from '../../hooks/useNotify';
import {
  USER_ALREADY_EXISTS,
  UserErrors,
  isUserError,
  userErrors,
} from '../../lib/errors';
import { RegisterForm } from '../../components/RegisterForm/RegisterForm';
import { uploadCloudinaryFile } from '../../services/cloudinary';

interface RegisterPageProps {
  mockOnSubmit?: SubmitHandler<RegisterFormValues>; // For tests purpose
}

export function RegisterPage({ mockOnSubmit }: RegisterPageProps) {
  const navigate = useNavigate();
  const methods = useForm<RegisterFormValues>({
    resolver: joiResolver(registerSchema),
  });

  const {
    handleSubmit,
    setError,
    formState: { isValid, isSubmitting, isSubmitted },
  } = methods;

  const { notify } = useNotify();
  const { register: signUp } = useAuth();

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    try {
      let avatarUrl = '';

      if (data.avatar) {
        avatarUrl = await uploadCloudinaryFile(data.avatar);
      } else {
        avatarUrl = `https://ui-avatars.com/api/?name=${`${data.name}+${data.surname}`}`;
      }

      const userData: User = {
        ...data,
        avatar: avatarUrl,
      };

      const res = await signUp(userData);

      notify(
        NotificationKind.Success,
        `${res.name}, bienvenido a la plataforma!`
      );

      navigate(FEED_URL);
    } catch (error) {
      if (isUserError(error)) {
        const formatError = error as Error;

        if (formatError.message === USER_ALREADY_EXISTS) {
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
    <FormProvider {...methods}>
      <div className='container grid h-screen w-full grid-cols-1 place-content-center md:mx-auto md:max-w-[400px]'>
        <form onSubmit={handleSubmit(mockOnSubmit ?? onSubmit)}>
          <h1 className='mb-2 block w-full text-center text-4xl font-semibold text-slate-900'>
            Digital Tech Inc.
          </h1>

          <p className='mb-10 block w-full text-center text-sm text-slate-600'>
            ¿Nuevo por aquí? Completa los campos y regístrate.
          </p>

          <RegisterForm />

          <div className='mt-6 flex flex-col justify-center'>
            <Button
              type='submit'
              disabled={(!isValid && isSubmitted) || isSubmitting}
            >
              Entrar
            </Button>

            <Link
              to={FEED_URL}
              className='mt-3 block w-full rounded border border-indigo-500 px-4 py-2 text-center text-sm text-indigo-500'
            >
              Volver al feed
            </Link>
          </div>

          {!isSubmitting && (
            <Link
              to={LOGIN_URL}
              className='mt-4 block text-center text-sm text-slate-600'
            >
              Ya tienes una cuenta?{' '}
              <span className='text-indigo-500'>Inicia sesión aquí</span>
            </Link>
          )}
        </form>
      </div>
    </FormProvider>
  );
}
