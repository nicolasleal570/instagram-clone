import * as React from 'react';
import classNames from 'classnames';

type IButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, ...buttonProps }: IButtonProps) {
  const { disabled } = buttonProps;

  return (
    <>
      <button
        className={classNames('block h-10 w-full rounded px-6 text-white ', {
          'cursor-not-allowed bg-gray-300 text-gray-500': disabled,
          'cursor-pointer bg-indigo-500 hover:bg-indigo-600': !disabled,
        })}
        {...buttonProps}
      >
        {children}
      </button>
    </>
  );
}
