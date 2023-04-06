import { useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { usePost } from '../../hooks/usePost';
import { useEffect, useMemo, useState } from 'react';
import { Post, User } from '../../types/models';
import { useUsers } from '../../hooks/useUser';
import { UserProfile } from '../UserProfile/UserProfile';

export function ProfilePage() {
  const { username } = useParams();
  const { users } = useUsers();
  const { currentUser } = useAuth();
  const { getPostsByUser } = usePost();
  const [allPosts, setAllPosts] = useState<Post[]>([]);

  const user = useMemo(
    () =>
      !username
        ? currentUser
        : users.find((userData) => userData.username === username),
    [users]
  );

  const isMyProfile: boolean = username === currentUser?.username || !username;

  useEffect(() => {
    const fetchPostsByUser = async () => {
      const data = await getPostsByUser(
        isMyProfile ? currentUser?.username : username
      );
      setAllPosts(data);
    };

    void fetchPostsByUser();
  }, []);

  return (
    <UserProfile
      user={user as User}
      allPosts={allPosts}
      isCurrentUserProfile={isMyProfile}
    />
  );
}
