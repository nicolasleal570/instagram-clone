import * as React from 'react';
import classNames from 'classnames';

interface IInputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasErrors?: boolean;
  leadIcon?: React.ReactNode;
}

export function InputField({
  hasErrors,
  leadIcon,
  ...inputProps
}: IInputFieldProps) {
  return (
    <div className='relative flex'>
      {!!leadIcon && (
        <span className='absolute left-0 top-0 inline-flex h-full max-w-[45px] items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-500'>
          {leadIcon}
        </span>
      )}
      <input
        type='text'
        id='website-admin'
        className={classNames(
          'block h-10 w-full min-w-0 flex-1 cursor-pointer bg-white text-sm font-normal leading-6 shadow-sm ring-0 ring-offset-0 placeholder:text-gray-400 focus:ring-0',
          {
            'border border-gray-300 text-gray-900': !hasErrors,
            'border border-red-300 text-red-500 placeholder:text-red-300':
              hasErrors,
            'cursor-not-allowed border border-gray-300 text-gray-400':
              inputProps.disabled,
            'rounded px-2.5 py-3 ': !leadIcon,
            'rounded-md py-3 pl-[55px] pr-2.5': !!leadIcon,
          }
        )}
        {...inputProps}
      />
    </div>
  );
}
