import { useWatch, type Control, Controller } from 'react-hook-form';
import { CreatePostFormValues } from '../../types/CreatePostFormValues';
import { getBase64 } from '../../lib/utils';
import { NotificationKind, useNotify } from '../../hooks/useNotify';

interface CustomFileInputProps {
  control: Control<CreatePostFormValues>;
}

export function CustomFileInput({ control }: CustomFileInputProps) {
  const { notify } = useNotify();
  const imageCurrentValue = useWatch({
    control,
    name: 'image',
  });

  return (
    <div>
      <label
        htmlFor='image'
        className='mx-auto flex max-h-[585px] min-h-[468px] w-[468px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded border border-gray-200 bg-gray-100'
      >
        {imageCurrentValue !== '' ? (
          <img
            src={imageCurrentValue}
            className='h-full w-full object-contain object-center'
            alt='Post cover'
          />
        ) : (
          <>
            <h3 className='text-xl text-gray-500'>
              Acompaña tu mensaje con una imagen!
            </h3>
            <p className='mt-4 text-xs font-light text-gray-400'>
              Haz click aquí.
            </p>
          </>
        )}
      </label>

      <Controller
        control={control}
        name='image'
        render={({ field: { name, onChange } }) => (
          <>
            <input
              type='file'
              className='hidden'
              id='image'
              name={name}
              aria-label={name}
              onChange={async (event) => {
                if (event.target.files?.[0]) {
                  const file = event.target.files[0];

                  if (!file.type.includes('image')) {
                    notify(NotificationKind.Error, 'Tipo de archivo inválido');
                    return;
                  }

                  const base64 = (await getBase64(file)) as string;

                  onChange(base64);
                }
              }}
            />
            {imageCurrentValue !== '' && (
              <button
                type='button'
                className='mt-2 text-xs font-semibold text-red-400'
                onClick={() => onChange('')}
              >
                Eliminar foto
              </button>
            )}
          </>
        )}
      />
    </div>
  );
}
