import { Link } from 'react-router-dom';
import { HeartIcon } from './HeartIcon';
import { PROFILE_URL } from '../../lib/routes';
import { Post, User } from '../../types/models';
import { useAuth } from '../../hooks/useAuth';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';

export interface ActionButtonsProps {
  post: Post;
  haveLike: boolean;
  handleLike: () => void;
  handleEdit: () => void;
}

export function ActionButtons({
  post,
  haveLike,
  handleEdit,
  handleLike,
}: ActionButtonsProps) {
  const { currentUser } = useAuth();

  const likedByFormat = () => {
    const { likes } = post;
    if (!likes || likes.length === 0)
      return <p className='block py-2 text-sm font-semibold'>0 likes</p>;

    const firstUser = likes[0];

    return (
      <p className='block py-2 text-sm'>
        Le gusta a @
        <Link className='font-semibold' to={PROFILE_URL(firstUser.username)}>
          {firstUser.username}
        </Link>{' '}
        <span className='font-semibold'>
          {likes.length > 1 ? `y a ${likes.length - 1} más.` : ''}
        </span>
      </p>
    );
  };

  return (
    <>
      <div className='flex items-center space-x-4'>
        <button
          type='button'
          className='flex cursor-pointer items-center text-red-400 disabled:cursor-not-allowed disabled:text-gray-400'
          onClick={handleLike}
          disabled={post.status !== 'published'}
        >
          <HeartIcon haveLike={haveLike} />
        </button>

        {currentUser?.username === post.author.username && (
          <button
            type='button'
            className='cursor-pointer text-gray-600'
            onClick={handleEdit}
          >
            <Cog6ToothIcon className='h-6 w-6 text-inherit' />
          </button>
        )}
      </div>

      {likedByFormat()}
    </>
  );
}
