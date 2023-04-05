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

const fakePosts: Post[] = [
  {
    id: '1',
    message:
      'Jelly beans halvah powder sugar plum tiramisu biscuit cake. Topping marzipan tootsie roll cake chocolate cake. Brownie icing cookie biscuit liquorice.',
    likes: [],
    author: {
      name: 'Nico',
      surname: 'Leal',
      username: 'nico123',
      avatar: 'https://ui-avatars.com/api/?name=Nicolas+Leal',
    },
    image: 'https://source.unsplash.com/random/?city,night',
    create_at: new Date(),
    location: 'Caracas, Venezuela',
    status: 'published',
  },
  {
    id: '2',
    message:
      'Candy canes cake sugar plum toffee jelly beans. Cake cookie donut gummi bears tart brownie. Jelly beans icing candy canes shortbread cake chocolate cake sugar plum cheesecake marzipan.',
    likes: [],
    author: {
      name: 'John',
      surname: 'Doe',
      username: 'john_doe',
      avatar: 'https://ui-avatars.com/api/?name=John+Doe',
    },
    create_at: new Date(),
    location: 'Caracas, Venezuela',
    status: 'published',
  },
];

export const PostContext = createContext<PostContextType | null>(null);

export function PostContextProvider({ children }: PostContextProviderProps) {
  const [posts, setPosts] = useState<Post[]>([...fakePosts]);
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
