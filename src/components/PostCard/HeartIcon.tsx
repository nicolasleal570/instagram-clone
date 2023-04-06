import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

interface HeartIconProps {
  haveLike: boolean;
}

export function HeartIcon({ haveLike }: HeartIconProps) {
  if (!haveLike) {
    return <HeartIconOutline className='h-6 w-6 text-inherit' />;
  }

  return <HeartIconSolid className='h-6 w-6 text-inherit' />;
}
