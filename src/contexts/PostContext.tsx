import { useEffect, useState, createContext, ReactNode, useMemo } from 'react';
import { useLocalStore } from '../hooks/useLocalStorage';
import { Post } from '../types/models';
import { POSTS_TABLE } from '../lib/db';
import { useAuth } from '../hooks/useAuth';

export interface PostContextType {
  posts: Post[];
  postsByUser: Post[];
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  createPost: (
    post: Pick<Post, 'image' | 'message' | 'location'>
  ) => Promise<Post | undefined>;
}

interface PostContextProviderProps {
  children: ReactNode;
}

export const PostContext = createContext<PostContextType | null>(null);

export function PostContextProvider({ children }: PostContextProviderProps) {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const { getData, setData } = useLocalStore<Post[]>(POSTS_TABLE);

  const postsByUser = useMemo(
    () =>
      posts.filter((post) => post.author.username === currentUser?.username),
    [posts, currentUser]
  );

  const createPost = async (
    post: Pick<Post, 'image' | 'message' | 'location'>
  ) => {
    if (currentUser) {
      const postData: Post = {
        ...post,
        id: Math.random().toString().slice(2),
        create_at: new Date().toISOString(),
        author: currentUser,
        likes: [],
        status: 'drafted',
      };

      const newPosts = [postData, ...posts].sort(
        (a, b) =>
          Date.parse(b.create_at as string) - Date.parse(a.create_at as string)
      );

      await setData(newPosts);

      setPosts(newPosts);

      return postData;
    }
  };

  const getAllPosts = async () => {
    const data = (await getData()) ?? [];
    setPosts(
      data.sort(
        (a, b) =>
          Date.parse(b.create_at as string) - Date.parse(a.create_at as string)
      )
    );
  };

  useEffect(() => {
    if (posts.length === 0) {
      void getAllPosts();
    }
  }, []);

  return (
    <PostContext.Provider
      value={{
        posts,
        postsByUser,
        isCreateModalOpen,
        setIsCreateModalOpen,
        createPost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
