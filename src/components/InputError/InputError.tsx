interface IInputErrorProps {
  message: string;
}

export function InputError({ message, ...props }: IInputErrorProps) {
  return (
    <span
      className='mt-1.5 block w-full text-xs font-normal leading-5 text-red-500'
      {...props}
    >
      {message}
    </span>
  );
}
