import {
  useState,
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useContext,
  memo,
} from 'react';
import { useLocalStore } from '../hooks/useLocalStorage';
import { Post } from '../types/models';
import { POSTS_TABLE } from '../lib/db';
import { useAuth } from '../hooks/useAuth';

export interface PostContextType {
  posts: Post[];
  currentUserPosts: Post[];
  isCreateModalOpen: boolean;
  editPost: Post | undefined;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  setIsCreateModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEditPost: React.Dispatch<React.SetStateAction<Post | undefined>>;
  createPost: (
    post: Pick<Post, 'image' | 'message' | 'location'>
  ) => Promise<Post | undefined>;
  updatePost: (oldPost: Post, newData: Post) => Promise<Post | undefined>;
  getAllPosts: () => Promise<Post[]>;
  getPostsByUser: (username?: string, includeAll?: boolean) => Promise<Post[]>;
  addLike: (postId: Post) => Promise<void>;
  removeLike: (postId: Post) => Promise<void>;
}

interface PostContextProviderProps {
  children: ReactNode;
}

export const PostContext = createContext<PostContextType | null>(null);

export function PostContextProvider({ children }: PostContextProviderProps) {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentUserPosts, setCurrentUserPosts] = useState<Post[]>([]);
  const [editPost, setEditPost] = useState<Post>();
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
    if (!currentUser) return;

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
  };

  const updatePost = async (oldPost: Post, newData: Post) => {
    if (!currentUser || currentUser.username !== oldPost.author.username)
      return;

    const postIndex = posts.findIndex((item) => item.id === oldPost.id);

    const updatedPost = {
      ...oldPost,
      ...newData,
    };

    const newPosts: Post[] = [
      ...posts.slice(0, postIndex),
      updatedPost,
      ...posts.slice(postIndex + 1),
    ].sort(
      (a, b) =>
        Date.parse(b.create_at as string) - Date.parse(a.create_at as string)
    );

    await setData(newPosts);

    setPosts(newPosts);
    setEditPost(undefined);

    return updatedPost;
  };

  const addLike = async (post: Post) => {
    if (currentUser) {
      const postIndex = posts.findIndex((item) => item.id === post.id);

      const newPost = { ...post, likes: [...(post.likes ?? []), currentUser] };

      const newPosts: Post[] = [
        ...posts.slice(0, postIndex),
        newPost,
        ...posts.slice(postIndex + 1),
      ];

      await setData(newPosts);
      setPosts(newPosts);
    }
  };

  const removeLike = async (post: Post) => {
    if (currentUser) {
      const postIndex = posts.findIndex((item) => item.id === post.id);

      const newPost = {
        ...post,
        likes: [
          ...(post.likes ?? []).filter(
            (like) => like.username !== currentUser.username
          ),
        ],
      };

      const newPosts: Post[] = [
        ...posts.slice(0, postIndex),
        newPost,
        ...posts.slice(postIndex + 1),
      ];

      await setData(newPosts);
      setPosts(newPosts);
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
    if (currentUser) {
      setCurrentUserPosts(
        posts.filter((item) => item.author.username === currentUser.username)
      );
      return;
    }

    setCurrentUserPosts([]);
  }, [posts, currentUser]);

  return (
    <PostContext.Provider
      value={{
        posts,
        currentUserPosts,
        isCreateModalOpen,
        editPost,
        setPosts,
        getPostsByUser,
        getAllPosts,
        setIsCreateModalOpen,
        setEditPost,
        createPost,
        updatePost,
        addLike,
        removeLike,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

export const SetupPosts = memo(function () {
  const { getAllPosts } = useContext(PostContext) as PostContextType;

  useEffect(() => {
    void getAllPosts();
  }, []);

  return <></>;
});

SetupPosts.displayName = 'SetupPosts';
