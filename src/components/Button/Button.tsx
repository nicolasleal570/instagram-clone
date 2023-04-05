import * as React from 'react';
import classNames from 'classnames';

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  kind?: 'primary' | 'secondary';
}

export function Button({
  children,
  kind = 'primary',
  ...buttonProps
}: IButtonProps) {
  const { disabled } = buttonProps;

  return (
    <>
      <button
        className={classNames('block h-10 w-full rounded px-6 ', {
          'cursor-not-allowed bg-gray-300 text-gray-500': disabled,
          'cursor-pointer bg-indigo-500 text-white hover:bg-indigo-600':
            !disabled && kind === 'primary',
          'cursor-pointer border border-indigo-500 text-indigo-500 hover:bg-indigo-600':
            !disabled && kind === 'secondary',
        })}
        {...buttonProps}
      >
        {children}
      </button>
    </>
  );
}
