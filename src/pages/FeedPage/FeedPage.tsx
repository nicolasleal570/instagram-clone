import { PostCard } from '../../components/PostCard/PostCard';
import { usePost } from '../../hooks/usePost';

export function FeedPage() {
  const { posts } = usePost();

  return (
    <div className='mx-auto mb-20 grid w-full grid-cols-1 gap-10 sm:max-w-[468px]'>
      {posts.map((post) => (
        <PostCard post={post} key={post.id} />
      ))}
    </div>
  );
}
