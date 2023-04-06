import { HeartIcon } from '@heroicons/react/24/outline';
import dayjs from 'dayjs';
import { Post } from '../../types/models';
import { Link } from 'react-router-dom';
import { PROFILE_URL } from '../../lib/routes';

interface IPostCardProps {
  post: Post;
}

interface IPostWithImageProps extends IPostCardProps {
  handleLike: () => void;
}

const getClassByPostStatus = (
  status: 'published' | 'drafted' | 'deleted'
): { class: string; label: string } => {
  const statusToText = {
    published: {
      label: 'Publicado',
      class: 'hidden',
    },
    drafted: {
      label: 'Borrador',
      class: 'text-yellow-600 bg-yellow-200 px-3 py-1 rounded-full',
    },
    deleted: {
      label: 'Eliminado',
      class: 'text-red-600 bg-red-200 px-3 py-1 rounded-full',
    },
  };

  return statusToText[status];
};

function PostWithImage({ post, handleLike }: IPostWithImageProps) {
  const status = getClassByPostStatus(post.status);

  return (
    <div className=''>
      <div className='flex items-center px-2 py-4'>
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

          <p
            className={`my-3 ml-auto inline-block text-xs md:my-0 ${status.class}`}
          >
            {status.label}
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
          className='flex items-center'
          onClick={handleLike}
        >
          <HeartIcon className='h-6 w-6 text-gray-800' />
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

function PostWithMessage({ post, handleLike }: IPostWithImageProps) {
  const status = getClassByPostStatus(post.status);

  return (
    <div className='grid grid-cols-9 px-2 pt-4'>
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
            <p className='flex items-center text-lg font-semibold'>
              {post.author.name} {post.author.surname}
              <span className='ml-4 mr-1 text-sm font-light text-gray-400'>
                @{post.author.username} •
              </span>
              <span className='text-sm font-light text-gray-400'>
                {dayjs(post.create_at).fromNow()}
              </span>
            </p>
            <p
              className={`my-3 ml-auto inline-block text-xs md:my-0 ${status.class}`}
            >
              {status.label}
            </p>
          </Link>
        </div>
        <p className='text-justify text-sm leading-relaxed text-gray-800'>
          {post.message}
        </p>

        <div className='mt-4  w-full'>
          <button
            type='button'
            className='flex items-center'
            onClick={handleLike}
          >
            <HeartIcon className='h-6 w-6 text-gray-800' />
            <p className='ml-2.5 text-gray-800'>{post.likes?.length}</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export function PostCard({ post }: IPostCardProps) {
  const handleLike = () => {
    console.log('LIKE LIKE LIKE');
  };

  if (post.image) {
    return <PostWithImage post={post} handleLike={handleLike} />;
  }

  return <PostWithMessage post={post} handleLike={handleLike} />;
}
