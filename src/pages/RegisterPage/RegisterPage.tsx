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
import { UserErrors, userErrors } from '../../lib/errors';
import { RegisterForm } from '../../components/RegisterForm/RegisterForm';

export function RegisterPage() {
  const navigate = useNavigate();
  const methods = useForm<RegisterFormValues>({
    resolver: joiResolver(registerSchema),
  });

  const {
    handleSubmit,
    formState: { isValid, isSubmitted },
  } = methods;

  const { notify } = useNotify();
  const { register } = useAuth();

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    try {
      const userData: User = {
        ...data,
      };

      const res = await register(userData);

      notify(
        NotificationKind.Success,
        `${res.name}, bienvenido a la plataforma!`
      );

      navigate(FEED_URL);
    } catch (error) {
      if (error instanceof Error) {
        notify(
          NotificationKind.Error,
          userErrors[error.message as keyof UserErrors](data.username)
        );
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <div className='container grid h-screen w-full grid-cols-1 place-content-center px-8 md:mx-auto md:max-w-[400px]'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className='mb-2 block w-full text-center text-4xl font-semibold text-slate-900'>
            Digital Tech Inc.
          </h1>

          <p className='mb-10 block w-full text-center text-sm text-slate-600'>
            ¿Nuevo por aquí? Completa los campos y regístrate.
          </p>

          <RegisterForm />

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
    </FormProvider>
  );
}
