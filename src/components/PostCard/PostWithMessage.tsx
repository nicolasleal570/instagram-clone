import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { Post } from '../../types/models';
import { StatusBadge } from './StatusBadge';
import { PROFILE_URL } from '../../lib/routes';
import { HeartIcon } from './HeartIcon';

interface IPostWithMessageProps {
  post: Post;
  handleLike: () => void;
  haveLike: boolean;
}

export function PostWithMessage({
  post,
  handleLike,
  haveLike,
}: IPostWithMessageProps) {
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
                <span className='ml-4 mr-1 text-sm font-light text-gray-400'>
                  @{post.author.username} •
                </span>
                <span className='text-sm font-light text-gray-400'>
                  {dayjs(post.create_at).fromNow()}
                </span>
              </p>
            </Link>
          </div>
          <p className='text-justify text-sm leading-relaxed text-gray-800'>
            {post.message}
          </p>

          <div className='mt-4  w-full'>
            <button
              type='button'
              className='flex cursor-pointer items-center text-red-400 disabled:cursor-not-allowed disabled:text-gray-400'
              onClick={handleLike}
              disabled={post.status !== 'published'}
            >
              <HeartIcon haveLike={haveLike} />
              <p className='ml-2 text-gray-800'>{post.likes?.length}</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
