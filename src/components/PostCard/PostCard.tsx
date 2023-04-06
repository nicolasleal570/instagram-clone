import { Post } from '../../types/models';
import { useNavigate } from 'react-router-dom';
import { LOGIN_URL } from '../../lib/routes';
import { usePost } from '../../hooks/usePost';
import { useAuth } from '../../hooks/useAuth';
import { useMemo } from 'react';
import { PostWithImage } from './PostWithImage';
import { PostWithMessage } from './PostWithMessage';

interface IPostCardProps {
  post: Post;
}

export function PostCard({ post }: IPostCardProps) {
  const navigate = useNavigate();
  const { posts, addLike, removeLike, setIsCreateModalOpen, setEditPost } =
    usePost();
  const { currentUser } = useAuth();

  const haveLike: boolean = useMemo(
    () =>
      !!posts
        .find((data) => data.id === post.id)
        ?.likes?.map((item) => item.username)
        .includes(currentUser?.username ?? ''),
    [posts, currentUser]
  );

  const handleLike = async () => {
    if (!currentUser) {
      navigate(LOGIN_URL);
      return;
    }

    if (post.status !== 'published') return;

    if (!haveLike) {
      await addLike(post);
      return;
    }

    await removeLike(post);
  };

  const handleEdit = () => {
    setEditPost(post);
    setIsCreateModalOpen(true);
  };

  if (post.image) {
    return (
      <div className='pt-4'>
        <PostWithImage
          post={post}
          haveLike={haveLike}
          handleLike={handleLike}
          handleEdit={handleEdit}
        />
      </div>
    );
  }

  return (
    <div className='pb-4'>
      <PostWithMessage
        post={post}
        haveLike={haveLike}
        handleLike={handleLike}
        handleEdit={handleEdit}
      />
    </div>
  );
}
