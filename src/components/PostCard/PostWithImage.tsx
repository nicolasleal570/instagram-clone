import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { Cog6ToothIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { Post } from '../../types/models';
import { StatusBadge } from './StatusBadge';
import { PROFILE_URL } from '../../lib/routes';
import { HeartIcon } from './HeartIcon';
import { useAuth } from '../../hooks/useAuth';

interface IPostWithImageProps {
  post: Post;
  haveLike: boolean;
  handleLike: () => void;
  handleEdit: () => void;
}

export function PostWithImage({
  post,
  haveLike,
  handleLike,
  handleEdit,
}: IPostWithImageProps) {
  const { currentUser } = useAuth();

  return (
    <div className=''>
      <StatusBadge status={post.status} className='mb-4' />
      <div className='flex items-center px-2 pb-4'>
        <img
          src={post.author.avatar}
          className='h-10 w-10 rounded-full object-cover object-center'
        />

        <div className='flex flex-col'>
          <Link to={PROFILE_URL(post.author.username)}>
            <p className='ml-2 flex items-center text-lg font-semibold'>
              {post.author.name} {post.author.surname}
              <span className='ml-2 text-sm font-light text-gray-400'>
                @{post.author.username}
              </span>
            </p>
          </Link>
          <div className='flex w-full items-center'>
            <span className='ml-2 mr-1 text-sm font-light text-gray-400'>
              {post.location} •
            </span>
            <span className='text-sm font-light text-gray-400'>
              {dayjs(post.create_at).fromNow()}
            </span>
          </div>
        </div>
      </div>

      <div className='max-h-[585px] w-full overflow-hidden'>
        <img
          className='h-full w-full object-contain object-center'
          alt={post.message}
          src={post.image}
        />
      </div>
      <div className='px-2 pt-2 text-gray-800 sm:px-0'>
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
        <p className='block py-2 text-sm font-semibold'>
          {post.likes?.length} Likes
        </p>
        <p className='text-justify text-sm'>
          <Link to={PROFILE_URL(post.author.username)}>
            <span className='font-bold'>{post.author.username}</span>
          </Link>{' '}
          {post.message}
        </p>
      </div>
    </div>
  );
}
