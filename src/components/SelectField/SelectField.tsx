import * as React from 'react';
import classNames from 'classnames';

export interface OptionType {
  value: string;
  label: string;
}

interface ISelectFieldProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  hasErrors?: boolean;
  options: OptionType[];
}

export function SelectField({
  hasErrors,
  options,
  ...inputProps
}: ISelectFieldProps) {
  return (
    <div className='relative flex'>
      <select
        className={classNames(
          'block h-10 w-full min-w-0 flex-1 rounded text-sm font-normal leading-6 shadow-sm ring-0 ring-offset-0 placeholder:text-gray-400 focus:ring-0',
          {
            'cursor-pointer border border-gray-300 bg-white text-gray-900':
              !hasErrors && !inputProps.disabled,
            'border border-red-300 text-red-500 placeholder:text-red-300':
              hasErrors,
            'cursor-not-allowed border border-gray-300 bg-gray-200 text-gray-500  ':
              inputProps.disabled,
          }
        )}
        aria-label={inputProps.name}
        {...inputProps}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
