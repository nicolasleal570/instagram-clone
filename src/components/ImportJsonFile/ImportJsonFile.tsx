import { ChangeEventHandler } from 'react';
import { NotificationKind, useNotify } from '../../hooks/useNotify';
import { Post } from '../../types/models';
import { usePost } from '../../hooks/usePost';
import { useLocalStore } from '../../hooks/useLocalStorage';
import { POSTS_TABLE } from '../../lib/db';
import { importPostsSchema } from './rules';
import { useNavigate } from 'react-router-dom';
import { MY_PROFILE_URL } from '../../lib/routes';

export function ImportJsonFile() {
  const navigate = useNavigate();
  const { notify } = useNotify();
  const { posts, setPosts } = usePost();
  const { setData: setPostsData } = useLocalStore<Post[]>(POSTS_TABLE);

  const handleImportData: ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event?.target?.files?.[0];

    if (!file) return;

    const fileExtension = file.name.split('.').pop()?.toLowerCase() ?? '';

    if (fileExtension !== 'json') {
      notify(
        NotificationKind.Error,
        'Esta función solo sirve para archivos de tipo JSON'
      );
      return;
    }

    const fileReader = new FileReader();
    fileReader.readAsText(file, 'UTF-8');

    fileReader.onload = async (e) => {
      const rawPosts = (e?.target?.result ?? '[]') as string;

      const userNewPosts = (JSON.parse(rawPosts) as Post[]).map((post) => ({
        ...post,
        id: Math.random().toString().slice(2),
      }));

      const newPosts: Post[] = [...posts, ...userNewPosts].sort(
        (a, b) =>
          Date.parse(b.create_at as string) - Date.parse(a.create_at as string)
      );

      const result = importPostsSchema.validate(newPosts, {
        abortEarly: false,
      });

      if (result.error) {
        notify(
          NotificationKind.Error,
          'Debes utilizar un esquema válido de publicaciones.'
        );
        return;
      }

      await setPostsData(newPosts);
      setPosts(newPosts);

      navigate(MY_PROFILE_URL);
    };
  };

  return (
    <label htmlFor='import' className='block'>
      <p className='px-4 text-gray-800 hover:text-indigo-500'>Importar</p>
      <input
        type='file'
        id='import'
        className='hidden'
        onChange={handleImportData}
      />
    </label>
  );
}
