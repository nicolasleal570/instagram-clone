import { useEffect, useRef } from 'react';
import { useLocalStore } from './useLocalStorage';
import { POSTS_TABLE, USERS_TABLE } from '../lib/db';
import { Post, User } from '../types/models';
import { generatePosts, generateUsers } from '../lib/dataGenerator';
import { useUsers } from './useUser';
import { usePost } from './usePost';

export function useGenerateRandomData() {
  const mounted = useRef(false);
  const { getData: getUsersData, setData: setUsersData } =
    useLocalStore<User[]>(USERS_TABLE);
  const { getData: getPostsData, setData: setPostsData } =
    useLocalStore<Post[]>(POSTS_TABLE);

  const { setUsers } = useUsers();
  const { setPosts } = usePost();

  const generateData = async () => {
    let users = [];
    const usersData = await getUsersData();

    if (!usersData) {
      users = generateUsers();
      await setUsersData(users);
      setUsers(users);
    } else {
      users = usersData;
    }

    const postsData = await getPostsData();

    if (!postsData) {
      const posts = generatePosts(users);
      await setPostsData(posts);
      setPosts(posts);
    }
  };

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      void generateData();
    }
  }, []);
}
