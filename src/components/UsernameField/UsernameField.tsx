import * as React from 'react';
import classNames from 'classnames';

interface IInputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasErrors?: boolean;
}

export function InputField({ hasErrors, ...inputProps }: IInputFieldProps) {
  return (
    <>
      <input
        className={classNames(
          'w-full',
          { 'border border-gray-300 text-gray-900': !hasErrors },
          { 'border border-red-300 text-red-500': hasErrors },
          {
            'cursor-not-allowed border border-gray-300 text-gray-400':
              inputProps.disabled,
          },
          'text-base font-normal leading-6',
          'h-10 cursor-pointer rounded bg-white px-2.5 py-3 shadow-sm',
          'placeholder:text-gray-400',
          'focus:outline-none focus:ring focus:ring-indigo-300'
        )}
        {...inputProps}
      />
    </>
  );
}
