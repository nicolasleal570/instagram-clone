import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { Post } from '../../types/models';
import { StatusBadge } from './StatusBadge';
import { PROFILE_URL } from '../../lib/routes';
import { HeartIcon } from './HeartIcon';

interface IPostWithImageProps {
  post: Post;
  handleLike: () => void;
  haveLike: boolean;
}

export function PostWithImage({
  post,
  handleLike,
  haveLike,
}: IPostWithImageProps) {
  return (
    <div className=''>
      <StatusBadge status={post.status} className='mb-4' />
      <div className='flex items-center px-2 pb-4'>
        <img
          src={post.author.avatar}
          className='h-10 w-10 rounded-full object-cover object-center'
        />

        <Link
          to={PROFILE_URL(post.author.username)}
          className='flex w-full items-center'
        >
          <p className='ml-2 flex items-center text-lg font-semibold'>
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

      <div className='max-h-[585px] w-full overflow-hidden'>
        <img
          className='h-full w-full object-contain object-center'
          alt={post.message}
          src={post.image}
        />
      </div>
      <div className='px-2 pt-2 text-gray-800 sm:px-0'>
        <button
          type='button'
          className='flex cursor-pointer items-center text-red-400 disabled:cursor-not-allowed disabled:text-gray-400'
          onClick={handleLike}
          disabled={post.status !== 'published'}
        >
          <HeartIcon haveLike={haveLike} />
        </button>
        <p className='block py-2 text-sm font-semibold'>
          {post.likes?.length} Likes
        </p>
        <p className='text-justify text-sm'>
          <span className='font-bold'>{post.author.username}</span>{' '}
          {post.message}
        </p>
      </div>
    </div>
  );
}
