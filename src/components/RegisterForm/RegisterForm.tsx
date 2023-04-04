import { Controller, useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { AtSymbolIcon } from '@heroicons/react/24/solid';
import { InputField } from '../../components/InputField/InputField';
import { InputError } from '../../components/InputError/InputError';
import { RegisterFormValues } from '../../types/RegisterFormValues';

export function RegisterForm() {
  const {
    control,
    formState: { errors },
  } = useFormContext<RegisterFormValues>();

  return (
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
  );
}
