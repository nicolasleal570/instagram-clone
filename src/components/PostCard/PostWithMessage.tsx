import { Link } from 'react-router-dom';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';
import dayjs from 'dayjs';
import { Post } from '../../types/models';
import { StatusBadge } from './StatusBadge';
import { PROFILE_URL } from '../../lib/routes';
import { HeartIcon } from './HeartIcon';
import { useAuth } from '../../hooks/useAuth';

interface IPostWithMessageProps {
  post: Post;
  haveLike: boolean;
  handleLike: () => void;
  handleEdit: () => void;
}

export function PostWithMessage({
  post,
  haveLike,
  handleLike,
  handleEdit,
}: IPostWithMessageProps) {
  const { currentUser } = useAuth();

  return (
    <>
      <div className='grid grid-cols-9 px-2 pt-4'>
        <StatusBadge status={post.status} className='col-span-9 mb-4' />

        <img
          src={post.author.avatar}
          className='h-10 w-10 rounded-full object-cover object-center'
        />
        <div className='col-span-8 w-full'>
          <div className='text-gray-800'>
            <Link
              to={PROFILE_URL(post.author.username)}
              className='flex w-full flex-col items-center md:flex-row'
            >
              <p className='flex w-full items-center truncate text-lg font-semibold'>
                {post.author.name} {post.author.surname}
                <span className='ml-2 mr-1 text-sm font-light text-gray-400'>
                  @{post.author.username}
                </span>
              </p>
            </Link>
          </div>
          <p className='text-justify text-sm leading-relaxed text-gray-800'>
            {post.message}
          </p>
          <p className='mt-2 text-sm font-light text-gray-400'>
            {dayjs(post.create_at).fromNow()} desde {post.location}
          </p>

          <div className='mt-4 flex w-full items-center space-x-4'>
            <button
              type='button'
              className='flex cursor-pointer items-center text-red-400 disabled:cursor-not-allowed disabled:text-gray-400'
              onClick={handleLike}
              disabled={post.status !== 'published'}
            >
              <HeartIcon haveLike={haveLike} />
              <p className='ml-2 text-gray-800'>{post.likes?.length}</p>
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
        </div>
      </div>
    </>
  );
}
