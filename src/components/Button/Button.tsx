import * as React from 'react';
import classNames from 'classnames';

type IButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, ...buttonProps }: IButtonProps) {
  const { disabled } = buttonProps;

  return (
    <>
      <button
        className={classNames(
          'ml-2 h-10 rounded bg-indigo-400 px-6 text-white',
          {
            'cursor-not-allowed bg-gray-400 text-gray-500': disabled,
            'cursor-pointer': !disabled,
          }
        )}
        {...buttonProps}
      >
        {children}
      </button>
    </>
  );
}
