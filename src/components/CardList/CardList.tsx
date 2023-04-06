import { Post } from '../../types/models';
import { PostCard } from '../PostCard/PostCard';

interface CardListProps {
  posts: Post[];
}

export function CardList({ posts }: CardListProps) {
  return (
    <div className='mx-auto mb-20 grid w-full grid-cols-1 gap-10 divide-y sm:max-w-[468px]'>
      {posts.map((post) => (
        <PostCard post={post} key={post.id} />
      ))}
    </div>
  );
}
