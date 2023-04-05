import { useMemo } from 'react';
import { PostCard } from '../../components/PostCard/PostCard';
import { usePost } from '../../hooks/usePost';

export function FeedPage() {
  const { posts } = usePost();

  const postsFiltered = useMemo(
    () => posts.filter((post) => post.status === 'published'),
    [posts]
  );

  return (
    <div className='mx-auto mb-20 grid w-full grid-cols-1 gap-10 sm:max-w-[468px]'>
      {postsFiltered.map((post) => (
        <PostCard post={post} key={post.id} />
      ))}
    </div>
  );
}
