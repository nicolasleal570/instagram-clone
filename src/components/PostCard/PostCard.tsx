import { HeartIcon } from '@heroicons/react/24/outline';
import dayjs from 'dayjs';
import { Post } from '../../types/models';

interface IPostCardProps {
  post: Post;
}

interface IPostWithImageProps extends IPostCardProps {
  handleLike: () => void;
}

function PostWithImage({ post, handleLike }: IPostWithImageProps) {
  return (
    <div className=''>
      <div className='flex items-center px-2 py-4'>
        <img src={post.author.avatar} className='h-10 w-10 rounded-full' />
        <p className='ml-2 flex items-center text-lg font-semibold'>
          {post.author.name} {post.author.surname}
          <span className='ml-4 mr-1 text-sm font-light text-gray-400'>
            @{post.author.username} •
          </span>
          <span className='text-sm font-light text-gray-400'>
            {dayjs(post.create_at).fromNow()}
          </span>
        </p>
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
  return (
    <div className='grid grid-cols-9 px-2 sm:px-0'>
      <img src={post.author.avatar} className='h-10 w-10 rounded-full' />
      <div className='col-span-8 w-full'>
        <div className='text-gray-800'>
          <p className='flex items-center text-lg font-semibold'>
            {post.author.name} {post.author.surname}
            <span className='ml-4 mr-1 text-sm font-light text-gray-400'>
              @{post.author.username} •
            </span>
            <span className='text-sm font-light text-gray-400'>
              {dayjs(post.create_at).fromNow()}
            </span>
          </p>
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
