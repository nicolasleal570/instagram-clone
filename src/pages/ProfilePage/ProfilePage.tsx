import { useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { usePost } from '../../hooks/usePost';
import { useMemo } from 'react';
import { User } from '../../types/models';
import { useUsers } from '../../hooks/useUser';
import { UserProfile } from '../UserProfile/UserProfile';

export function ProfilePage() {
  const { username } = useParams();
  const { users } = useUsers();
  const { currentUser } = useAuth();
  const { currentUserPosts, posts: allPosts } = usePost();

  const posts = useMemo(() => {
    return !username || currentUser?.username === username
      ? currentUserPosts
      : allPosts.filter(
          (postData) =>
            postData.author.username === username &&
            postData.status === 'published'
        );
  }, [currentUserPosts, allPosts]);

  const user = useMemo(
    () =>
      !username
        ? currentUser
        : users.find((userData) => userData.username === username),
    [users, currentUser]
  );

  const isMyProfile: boolean = username === currentUser?.username || !username;

  return (
    <UserProfile
      user={user as User}
      allPosts={posts}
      isCurrentUserProfile={isMyProfile}
    />
  );
}
