import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { InputField } from '../InputField/InputField';
import { usePost } from '../../hooks/usePost';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Post } from '../../types/models';
import { useDebounce } from '../../hooks/useDebounce';

export function SearchBar() {
  const { posts, setPosts } = usePost();
  const [search, setSearch] = useState('');
  const mounted = useRef<boolean>(false);
  const allPosts = useRef<Post[]>([]);

  const debouncedSearch = useDebounce<string>(search);

  const handleFilter = useCallback(() => {
    if (!debouncedSearch) {
      setPosts(allPosts.current);
      return;
    }

    const filtered = [...allPosts.current].filter((post) => {
      const { author, ...rest } = post;
      const combined = { ...rest, ...author };

      const values = Object.values(combined);

      return values.some((val) =>
        String(val).toLowerCase().includes(debouncedSearch)
      );
    });

    setPosts(filtered);
  }, [debouncedSearch]);

  useEffect(() => {
    return () => {
      handleFilter();
    };
  }, []);

  useEffect(() => {
    if (allPosts.current.length > 0) {
      handleFilter();
    }
  }, [debouncedSearch]);

  useEffect(() => {
    if (posts.length > 0 && !mounted.current) {
      allPosts.current = [...posts];
      mounted.current = true;
    }
  }, [posts]);

  return (
    <InputField
      type='text'
      name='search'
      leadIcon={<MagnifyingGlassIcon className='h-5 w-5 text-inherit' />}
      placeholder='Busca por contenido o por usuario...'
      onChange={(e) => setSearch(e.target.value.toLowerCase())}
    />
  );
}
