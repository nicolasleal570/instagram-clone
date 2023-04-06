import { usePost } from '../../hooks/usePost';
import { Post } from '../../types/models';
import { PostCard } from '../PostCard/PostCard';

interface CardListProps {
  posts: Post[];
}

export function CardList({ posts }: CardListProps) {
  const { setIsCreateModalOpen } = usePost();

  return (
    <div className='mx-auto mb-20 grid w-full grid-cols-1 gap-10 divide-y sm:max-w-[468px]'>
      {posts.length === 0 && (
        <div className='flex w-full flex-col justify-center py-10'>
          <h1 className=' text-center text-xl text-slate-400'>
            No hay posts disponibles!
          </h1>
          <button
            type='button'
            className='mt-4 block text-sm text-indigo-500'
            onClick={() => setIsCreateModalOpen(true)}
          >
            Crea una publicación!
          </button>
        </div>
      )}

      {posts.length > 0 &&
        posts.map((post) => <PostCard post={post} key={post.id} />)}
    </div>
  );
}
