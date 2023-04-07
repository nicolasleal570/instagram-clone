import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { usePost } from '../../hooks/usePost';
import { Button } from '../Button/Button';
import { TextareaField } from '../TextareaField/TextareaField';
import { joiResolver } from '@hookform/resolvers/joi';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { createPostSchema } from '../../lib/rules';
import { CreatePostFormValues } from '../../types/CreatePostFormValues';
import { MapPinIcon } from '@heroicons/react/24/outline';
import { ErrorMessage } from '@hookform/error-message';
import { InputError } from '../InputError/InputError';
import { InputField } from '../InputField/InputField';
import { CustomFileInput } from './CustomFileInput';
import { NotificationKind, useNotify } from '../../hooks/useNotify';
import { OptionType, SelectField } from '../SelectField/SelectField';
import { Post } from '../../types/models';

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

interface PostModalFormProps {
  mockOnSubmit?: SubmitHandler<CreatePostFormValues>; // For tests purpose
}

function PostModalFormContainer({ mockOnSubmit }: PostModalFormProps) {
  const { notify } = useNotify();
  const {
    isCreateModalOpen,
    setIsCreateModalOpen,
    createPost,
    updatePost,
    editPost,
    setEditPost,
  } = usePost();
  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitted, isSubmitting },
  } = useForm<CreatePostFormValues>({
    resolver: joiResolver(createPostSchema),
    defaultValues: {
      message: editPost?.message ?? '',
      location: editPost?.location ?? '',
      status: editPost?.status ?? 'drafted',
      image: editPost?.image ?? '',
    },
  });

  const closeModal = () => {
    setIsCreateModalOpen(false);
    setEditPost(undefined);
  };
  const onSubmit: SubmitHandler<CreatePostFormValues> = async (data) => {
    try {
      if (!editPost) {
        await createPost({
          message: data.message,
          location: data.location,
          image: data.image,
          status: data.status,
        });
      } else {
        await updatePost(editPost, {
          image: data.image,
          ...data,
        } as Post);
      }

      notify(
        NotificationKind.Success,
        editPost
          ? 'Actualizaste tu publicación con éxito'
          : 'Publicación creada con éxito!'
      );
      setIsCreateModalOpen(false);
    } catch (error) {
      notify(
        NotificationKind.Error,
        'Ocurrió un error inesperado, intenta de nuevo'
      );
    }
  };

  const handleRemove = async () => {
    if (!editPost) return;

    try {
      await updatePost(editPost, {
        ...editPost,
        status: 'deleted',
      } as Post);

      notify(NotificationKind.Warn, 'Eliminaste la publicación');
      setIsCreateModalOpen(false);
    } catch (error) {
      notify(
        NotificationKind.Error,
        'Ocurrió un error inesperado, intenta de nuevo'
      );
    }
  };

  return (
    <Transition appear show={isCreateModalOpen} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={closeModal}>
        <Transition.Child as={Fragment} {...animations}>
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='my-4 flex justify-center text-center'>
            <Transition.Child as={Fragment} {...contentAnimations}>
              <form onSubmit={handleSubmit(mockOnSubmit ?? onSubmit)}>
                <Dialog.Panel className='w-full transform overflow-hidden rounded bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-900'
                  >
                    {editPost
                      ? 'Actualiza tu publicación'
                      : 'Crea una publicación'}
                  </Dialog.Title>
                  <div className='mb-4 mt-2'>
                    <p className='text-sm text-gray-500'>
                      Puedes hacer públicas tus ideas y pensamientos con tus
                      publicaciones!
                    </p>
                  </div>
                  <div className='space-y-4'>
                    <CustomFileInput control={control} />

                    <Controller
                      control={control}
                      name='message'
                      render={({
                        field: { value, name, onChange },
                        fieldState: { invalid },
                      }) => (
                        <div className='space-y-1'>
                          <TextareaField
                            name={name}
                            value={value ?? ''}
                            onChange={onChange}
                            hasErrors={invalid}
                            placeholder='Ingresa un mensaje...'
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
                      name='location'
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
                            placeholder='Ej. Caracas, D.F. Venezuela'
                            leadIcon={
                              <MapPinIcon className='h-5 w-5 text-inherit' />
                            }
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
                      name='status'
                      render={({
                        field: { value, name, onChange },
                        fieldState: { invalid },
                      }) => (
                        <div className='space-y-1'>
                          <SelectField
                            name={name}
                            value={value ?? 'drafted'}
                            onChange={onChange}
                            hasErrors={invalid}
                            options={
                              [
                                { label: 'Borrador', value: 'drafted' },
                                { label: 'Publicar', value: 'published' },
                                editPost?.status === 'deleted' && {
                                  label: 'Eliminado',
                                  value: 'deleted',
                                },
                              ].filter(Boolean) as OptionType[]
                            }
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

                  {editPost && (
                    <div className='my-10 w-[468px] rounded border-2 border-red-400 p-4'>
                      <h3 className='text-lg text-red-500'>
                        ¡
                        {editPost.status === 'deleted'
                          ? 'Eliminaste este post'
                          : 'Zona peligrosa'}
                        !
                      </h3>
                      <p className='text-sm text-gray-800'>
                        {editPost.status === 'deleted'
                          ? 'Puedes recuperar este post utilizando el selector de estados.'
                          : 'Puedes eliminar tu publicación, podrás recupérarla en el futuro utilizando el selector de estatus.'}
                      </p>

                      {editPost?.status !== 'deleted' && (
                        <button
                          type='button'
                          onClick={handleRemove}
                          className='ml-auto mt-4 block cursor-pointer rounded bg-red-500 px-3 py-1 text-white'
                        >
                          Eliminar
                        </button>
                      )}
                    </div>
                  )}

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
                      {editPost ? 'Actualizar' : 'Crear'}
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

export function PostModalForm(props: PostModalFormProps) {
  const { isCreateModalOpen } = usePost();

  if (!isCreateModalOpen) return <></>;

  return <PostModalFormContainer {...props} />;
}
