import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { StatusBadge } from './StatusBadge';
import { PROFILE_URL } from '../../lib/routes';
import { ActionButtons, ActionButtonsProps } from './ActionButtons';

type IPostWithMessageProps = ActionButtonsProps;

export function PostWithMessage({ post, ...rest }: IPostWithMessageProps) {
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
          <p className='mb-4 mt-2 text-sm font-light text-gray-400'>
            {dayjs(post.create_at).fromNow()} desde {post.location}
          </p>

          <ActionButtons {...{ post, ...rest }} />
        </div>
      </div>
    </>
  );
}
