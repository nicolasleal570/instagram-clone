import { useEffect, useMemo, useState } from 'react';
import { Button } from '../../components/Button/Button';
import { CardList } from '../../components/CardList/CardList';
import { Post, User } from '../../types/models';

interface UserProfileProps {
  user: User;
  isCurrentUserProfile: boolean;
  allPosts: Post[];
}

const FILTER_VALUES = [
  { label: 'Todas', value: 'all' },
  { label: 'Publicadas', value: 'published' },
  { label: 'Borradores', value: 'drafted' },
  { label: 'Eliminadas', value: 'deleted' },
];

export function UserProfile({
  user,
  isCurrentUserProfile,
  allPosts,
}: UserProfileProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filter, setFilter] = useState('all');

  const likesCount = useMemo(
    () => posts.reduce((acc, curr) => (curr.likes?.length ?? 0) + acc, 0),
    [posts]
  );

  const handleFilter = (value: string) => () => {
    setFilter(value);
  };

  useEffect(() => {
    setPosts(allPosts);
  }, [allPosts]);

  useEffect(() => {
    if (isCurrentUserProfile) {
      if (filter === 'all') {
        setPosts(allPosts);
        return;
      }

      const postsFiltered = allPosts.filter((item) => item.status === filter);
      setPosts(postsFiltered);
    }
  }, [filter, allPosts]);

  return (
    <div className='container'>
      <div className='grid grid-cols-1 py-10 md:grid-cols-4'>
        <img
          src={user?.avatar}
          className='mx-auto h-36 w-36 rounded-full object-cover object-center md:mx-0'
        />

        <div className='p-2 md:col-span-3'>
          <div className='mb-5 flex flex-col items-center space-x-4 md:flex-row'>
            <h2 className='text-xl'>@{user?.username}</h2>
            {isCurrentUserProfile && (
              <div className='my-4 w-full md:my-0 md:w-3/12'>
                <Button
                  type='button'
                  onClick={() => console.log('UPDATE PROFILE!')}
                >
                  Actualizar
                </Button>
              </div>
            )}
          </div>
          <div className='flex space-x-4'>
            <div className='flex items-center'>
              <p className=''>
                <span className='font-semibold'>{allPosts.length}</span> posts
              </p>
            </div>
            <div className='flex items-center'>
              <p className=''>
                <span className='font-semibold'>{likesCount}</span> likes
              </p>
            </div>
          </div>
          <p className='font-semibold'>
            {user?.name} {user?.surname}
          </p>
        </div>

        {isCurrentUserProfile && (
          <div className='grid grid-cols-2 gap-4 py-4 md:col-span-4 md:flex md:items-center md:justify-center md:gap-0 md:space-x-4'>
            {FILTER_VALUES.map((item) => (
              <label key={item.value}>
                <input
                  type='radio'
                  name='filter'
                  value={item.value}
                  checked={filter === item.value}
                  onChange={handleFilter(item.value)}
                />
                <span className='ml-2'>{item.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <CardList posts={posts} />
    </div>
  );
}
