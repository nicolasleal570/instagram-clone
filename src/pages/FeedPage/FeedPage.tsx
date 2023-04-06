import { useEffect, useMemo } from 'react';
import { usePost } from '../../hooks/usePost';
import { CardList } from '../../components/CardList/CardList';

export function FeedPage() {
  const { posts } = usePost();

  const postsFiltered = useMemo(
    () => posts.filter((post) => post.status === 'published'),
    [posts]
  );

  return <CardList posts={postsFiltered} />;
}
