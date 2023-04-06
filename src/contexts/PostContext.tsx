import {
  useEffect,
  useState,
  createContext,
  ReactNode,
  useCallback,
} from 'react';
import { useLocalStore } from '../hooks/useLocalStorage';
import { Post } from '../types/models';
import { POSTS_TABLE } from '../lib/db';
import { useAuth } from '../hooks/useAuth';

export interface PostContextType {
  posts: Post[];
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  createPost: (
    post: Pick<Post, 'image' | 'message' | 'location'>
  ) => Promise<Post | undefined>;
  getPostsByUser: (username?: string, includeAll?: boolean) => Promise<Post[]>;
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

  const getPostsByUser = useCallback(
    async (username = currentUser?.username, includeAll = false) => {
      let allPosts: Post[] = [...posts];

      if (allPosts.length === 0) {
        const data = (await getData()) ?? [];
        allPosts = data;
      }

      const filteredPosts = allPosts.filter(
        (post) => post.author.username === username
      );

      if (username === currentUser?.username || includeAll) {
        return filteredPosts;
      }

      return filteredPosts.filter((post) => post.status === 'published');
    },
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

    return data;
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
        getPostsByUser,
        isCreateModalOpen,
        setIsCreateModalOpen,
        createPost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
