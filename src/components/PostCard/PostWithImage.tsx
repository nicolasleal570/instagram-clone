import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { StatusBadge } from './StatusBadge';
import { PROFILE_URL } from '../../lib/routes';
import { ActionButtons, ActionButtonsProps } from './ActionButtons';

export type IPostWithImageProps = ActionButtonsProps;

export function PostWithImage({ post, ...rest }: IPostWithImageProps) {
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
        <ActionButtons {...{ post, ...rest }} />

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
