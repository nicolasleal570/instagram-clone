interface IInputHighlightProps {
  message: string;
}

export function InputHighlight({ message, ...props }: IInputHighlightProps) {
  return (
    <span
      className='mt-1.5 text-xs font-normal leading-5 text-slate-500'
      {...props}
    >
      {message}
    </span>
  );
}
