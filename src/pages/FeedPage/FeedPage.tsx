import { useMemo } from 'react';
import { usePost } from '../../hooks/usePost';
import { CardList } from '../../components/CardList/CardList';
import { useAuth } from '../../hooks/useAuth';

export function FeedPage() {
  const { currentUser } = useAuth();
  const { posts } = usePost();

  const postsFiltered = useMemo(
    () =>
      posts.filter(
        (post) =>
          post.status === 'published' &&
          currentUser?.username !== post.author.username
      ),
    [posts]
  );

  return <CardList posts={postsFiltered} />;
}
