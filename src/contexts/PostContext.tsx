import { useEffect, useState, createContext, ReactNode } from 'react';
import { useLocalStore } from '../hooks/useLocalStorage';
import { Post } from '../types/models';
import { POSTS_TABLE } from '../lib/db';

export interface PostContextType {
  posts: Post[];
}

interface PostContextProviderProps {
  children: ReactNode;
}

export const PostContext = createContext<PostContextType | null>(null);

export function PostContextProvider({ children }: PostContextProviderProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const { getData } = useLocalStore<Post[]>(POSTS_TABLE);

  const getAllPosts = async () => {
    const data = await getData();
    setPosts(data ?? []);
  };

  useEffect(() => {
    void getAllPosts();
  }, []);

  return (
    <PostContext.Provider
      value={{
        posts,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
