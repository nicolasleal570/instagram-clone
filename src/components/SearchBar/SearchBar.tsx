import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { InputField } from '../InputField/InputField';
import { usePost } from '../../hooks/usePost';
import { ChangeEventHandler, useEffect, useRef, useState } from 'react';
import { Post } from '../../types/models';

export function SearchBar() {
  const { posts, setPosts } = usePost();
  const [allPosts, setAllPosts] = useState<Post[]>([]);

  const mounted = useRef<boolean>(false);

  const handleFilter: ChangeEventHandler<HTMLInputElement> = (event) => {
    const inputValue = event.target.value.toLowerCase();

    if (!inputValue) {
      setPosts(allPosts);
      return;
    }

    const filtered = [...allPosts].filter((post) => {
      const { author, ...rest } = post;
      const combined = { ...rest, ...author };

      const values = Object.values(combined);

      return values.some((val) =>
        String(val).toLowerCase().includes(inputValue)
      );
    });

    setPosts(filtered);
  };

  useEffect(() => {
    if (posts.length > 0 && !mounted.current) {
      setAllPosts([...posts]);
      mounted.current = true;
    }
  }, [posts]);

  return (
    <InputField
      type='text'
      name='search'
      leadIcon={<MagnifyingGlassIcon className='h-5 w-5 text-inherit' />}
      placeholder='Busca por contenido o por usuario...'
      onChange={handleFilter}
    />
  );
}
