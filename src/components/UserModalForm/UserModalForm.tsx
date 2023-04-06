import { Fragment, Dispatch } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Button } from '../Button/Button';
import { joiResolver } from '@hookform/resolvers/joi';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { registerSchema } from '../../lib/rules';
import { RegisterFormValues } from '../../types/RegisterFormValues';
import { ErrorMessage } from '@hookform/error-message';
import { InputError } from '../InputError/InputError';
import { InputField } from '../InputField/InputField';
import { NotificationKind, useNotify } from '../../hooks/useNotify';
import { User } from '../../types/models';
import { InputHighlight } from '../InputHighlight/InputHighlight';
import { validateAndGetImageFile } from '../../lib/validateAndGetImageFile';
import { useAuth } from '../../hooks/useAuth';

const animations = {
  enter: 'ease-out duration-300',
  enterFrom: 'opacity-0',
  enterTo: 'opacity-100',
  leave: 'ease-in duration-200',
  leaveFrom: 'opacity-100',
  leaveTo: 'opacity-0',
};

const contentAnimations = {
  enter: 'ease-out duration-300',
  enterFrom: 'opacity-0 scale-95',
  enterTo: 'opacity-100 scale-100',
  leave: 'ease-in duration-200',
  leaveFrom: 'opacity-100 scale-100',
  leaveTo: 'opacity-0 scale-95',
};

interface UserModalFormProps {
  user: User;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<React.SetStateAction<boolean>>;
}

function UserModalFormContainer({
  user,
  isModalOpen,
  setIsModalOpen,
}: UserModalFormProps) {
  const { notify } = useNotify();

  const {
    handleSubmit,
    watch,
    control,
    formState: { errors, isValid, isSubmitted, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: joiResolver(registerSchema),
    defaultValues: {
      username: user.username,
      name: user.name,
      surname: user.surname,
      avatar: user.avatar,
    },
  });

  const { updateProfile } = useAuth();

  const currentName = watch('name');
  const currentSurname = watch('surname');
  const currentAvatar = watch('avatar');

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    if (!user) return;

    try {
      await updateProfile(data);

      notify(NotificationKind.Success, 'Actualizaste tu publicación con éxito');
      setIsModalOpen(false);
    } catch (error) {
      notify(
        NotificationKind.Error,
        'Ocurrió un error inesperado, intenta de nuevo'
      );
    }
  };

  return (
    <Transition appear show={isModalOpen} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={closeModal}>
        <Transition.Child as={Fragment} {...animations}>
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex h-screen items-center justify-center text-center'>
            <Transition.Child as={Fragment} {...contentAnimations}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Dialog.Panel className='w-[400px] transform overflow-hidden rounded bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-900'
                  >
                    {'Actualiza tu perfil'}
                  </Dialog.Title>
                  <div className='mb-4 mt-2'>
                    <p className='text-sm text-gray-500'>
                      Actualiza tu información personal.
                    </p>
                  </div>
                  <div className='space-y-4'>
                    <Controller
                      control={control}
                      name='avatar'
                      render={({ field: { name, onChange } }) => (
                        <>
                          <label htmlFor={name} className='relative bg-red-400'>
                            <img
                              src={currentAvatar}
                              className='mx-auto h-32 w-32 cursor-pointer rounded-full object-cover object-center'
                            />

                            <button
                              type='button'
                              className='absolute right-0 top-0'
                              onClick={() =>
                                onChange(
                                  `https://ui-avatars.com/api/?name=${`${currentName}+${currentSurname}`}`
                                )
                              }
                            >
                              <p className='text-xs font-semibold text-red-400'>
                                Eliminar
                              </p>
                            </button>
                          </label>
                          <input
                            type='file'
                            className='hidden'
                            id={name}
                            name={name}
                            onChange={async (event) => {
                              try {
                                const base64 = await validateAndGetImageFile(
                                  event
                                );

                                if (!base64) return;

                                onChange(base64);
                              } catch (error) {
                                if (error instanceof Error) {
                                  notify(NotificationKind.Error, error.message);
                                }
                              }
                            }}
                          />
                        </>
                      )}
                    />

                    <Controller
                      control={control}
                      name='username'
                      render={({
                        field: { value, name },
                        fieldState: { invalid },
                      }) => (
                        <div className='space-y-1'>
                          <InputField
                            name={name}
                            value={value}
                            hasErrors={invalid}
                            disabled
                          />
                          <ErrorMessage
                            errors={errors}
                            name={name}
                            render={({ message }) => (
                              <InputError message={message} />
                            )}
                          />
                          <InputHighlight message='No se puede editar el nombre de usuario.' />
                        </div>
                      )}
                    />

                    <Controller
                      control={control}
                      name='name'
                      render={({
                        field: { value, name, onChange },
                        fieldState: { invalid },
                      }) => (
                        <div className='space-y-1'>
                          <InputField
                            name={name}
                            value={value ?? ''}
                            onChange={onChange}
                            hasErrors={invalid}
                            placeholder='John'
                            disabled={isSubmitting}
                          />
                          <ErrorMessage
                            errors={errors}
                            name={name}
                            render={({ message }) => (
                              <InputError message={message} />
                            )}
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
                        <div className='space-y-1'>
                          <InputField
                            name={name}
                            value={value ?? ''}
                            onChange={onChange}
                            hasErrors={invalid}
                            placeholder='Doe'
                            disabled={isSubmitting}
                          />
                          <ErrorMessage
                            errors={errors}
                            name={name}
                            render={({ message }) => (
                              <InputError message={message} />
                            )}
                          />
                        </div>
                      )}
                    />
                  </div>

                  <div className='ml-auto mt-4 flex w-2/3 justify-end space-x-4'>
                    <Button
                      type='button'
                      kind='secondary'
                      onClick={closeModal}
                      disabled={(!isValid && isSubmitted) || isSubmitting}
                    >
                      Cancelar
                    </Button>
                    <Button
                      type='submit'
                      disabled={(!isValid && isSubmitted) || isSubmitting}
                    >
                      Actualizar
                    </Button>
                  </div>
                </Dialog.Panel>
              </form>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export function UserModalForm(props: UserModalFormProps) {
  return <UserModalFormContainer {...props} />;
}
