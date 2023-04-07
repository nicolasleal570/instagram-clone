import { ChangeEvent, useCallback, useState } from 'react';
import classNames from 'classnames';
import { CameraIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { getBase64 } from '../../lib/utils';
import { NotificationKind, useNotify } from '../../hooks/useNotify';

interface IFileFieldProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'value'
  > {
  onChange: (base64: string) => void;
  hasErrors?: boolean;
  fileType: 'image' | 'pdf';
}

export function FileField({
  hasErrors,
  fileType,
  onChange,
  ...inputProps
}: IFileFieldProps) {
  const { id: fieldId } = inputProps;
  const { notify } = useNotify();
  const [image, setImage] = useState<string>('');

  const onAvatarChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files?.[0]) {
        const file = event.target.files[0];

        if (!file.type.includes(fileType)) {
          notify(NotificationKind.Error, 'Tipo de archivo inválido');
          return;
        }

        const base64 = (await getBase64(file)) as string;

        setImage(base64);
        onChange(base64);
      }
    },
    []
  );

  const onDeleteImage = () => {
    setImage('');
    onChange('');
  };

  return (
    <>
      <div className='relative flex'>
        <span className='absolute left-0 top-0 inline-flex h-full max-w-[45px] items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-500'>
          <CameraIcon className='h-5 w-5 text-inherit' />
        </span>
        <input
          type='file'
          className='sr-only'
          id={fieldId}
          onChange={onAvatarChange}
          aria-label={inputProps.name}
          {...inputProps}
        />
        <label
          htmlFor={fieldId}
          className={classNames(
            'flex h-10 w-full min-w-0 flex-1 cursor-pointer items-center rounded bg-white px-2.5 py-3 pl-[55px] pr-2.5 text-sm font-normal leading-6 shadow-sm ring-0 ring-offset-0 placeholder:text-gray-400 focus:ring-0',
            {
              'border border-gray-300 text-gray-900': !hasErrors,
              'border border-red-300 text-red-500 placeholder:text-red-300':
                hasErrors,
              'cursor-not-allowed border border-gray-300 text-gray-400':
                inputProps.disabled,
            }
          )}
        >
          Selecciona tu foto de perfil
        </label>
      </div>
      {image && image !== '' && (
        <div className='mt-3 flex items-center justify-between rounded border border-gray-200 bg-gray-100 p-4'>
          <div className='h-16 w-16 bg-transparent'>
            <img
              className='h-full w-full object-contain object-center'
              src={image}
            />
          </div>
          <button
            type='button'
            className='bg-transparent'
            onClick={onDeleteImage}
          >
            <XMarkIcon className='h-6 w-6 text-gray-500' />
          </button>
        </div>
      )}
    </>
  );
}
