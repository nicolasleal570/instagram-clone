import { Popover } from '@headlessui/react';
import { useAuth } from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { FEED_URL, LOGIN_URL, MY_PROFILE_URL } from '../../lib/routes';
import { NotificationKind, useNotify } from '../../hooks/useNotify';
import { SearchBar } from '../SearchBar/SearchBar';
import { usePost } from '../../hooks/usePost';

export function UserMenu() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const { setIsCreateModalOpen, getPostsByUser } = usePost();
  const { notify } = useNotify();

  const handleCreatePublication = () => {
    setIsCreateModalOpen(true);
  };

  const handleLogout = async () => {
    try {
      await logout();

      notify(NotificationKind.Success, 'Gracias! Vuelve pronto.');

      navigate(LOGIN_URL);
    } catch (error) {
      notify(
        NotificationKind.Error,
        'Ocurrió un error inesperado. Intenta de nuevo'
      );
    }
  };

  return (
    <Popover className='relative'>
      <Popover.Button className='block h-14 w-14 overflow-hidden rounded border border-gray-100'>
        <img
          className='h-full w-full rounded object-cover object-center'
          src={currentUser?.avatar}
        />
      </Popover.Button>
      <Popover.Overlay className='fixed inset-0 h-screen w-full bg-black opacity-30' />

      <Popover.Panel className='absolute right-0 z-50 mt-2 block min-w-[200px] rounded border border-gray-200 bg-white'>
        <div className='grid grid-cols-1 text-sm'>
          <p className='border-b border-gray-200 p-4 font-semibold'>
            {currentUser?.name} {currentUser?.surname}
          </p>

          <div className='space-y-4 border-b border-gray-200 py-4'>
            <Popover.Button as={Link} to={MY_PROFILE_URL} className='block'>
              <p className='px-4 text-gray-800 hover:text-indigo-500'>Perfil</p>
            </Popover.Button>
            <button type='button' onClick={handleCreatePublication}>
              <p className='px-4 text-gray-800 hover:text-indigo-500'>Crear</p>
            </button>
          </div>

          <button
            type='button'
            className='p-4 text-left'
            onClick={handleLogout}
          >
            Salir
          </button>
        </div>
      </Popover.Panel>
    </Popover>
  );
}

export function Navbar() {
  const { isLoggedIn } = useAuth();

  return (
    <>
      <nav className='border-b border-gray-200 py-8'>
        <div className='container grid w-full grid-cols-2 md:grid-cols-3 md:items-center'>
          <Link to={FEED_URL} className='flex items-center'>
            <h1 className='mr-6 text-lg font-semibold md:text-2xl'>
              DTech Inc.
            </h1>
          </Link>

          <div className='hidden w-full md:block xl:mx-auto xl:w-[400px]'>
            <SearchBar />
          </div>

          <div className='ml-auto'>
            {!isLoggedIn ? (
              <div className='flex items-center'>
                <Link
                  to={LOGIN_URL}
                  className='flex h-10 cursor-pointer items-center rounded border border-indigo-500 px-6 font-semibold text-indigo-500 hover:bg-indigo-600 hover:text-white'
                >
                  Entrar
                </Link>
              </div>
            ) : (
              <UserMenu />
            )}
          </div>
        </div>
      </nav>
      <div className='block w-full border-b border-gray-200 py-4 md:hidden'>
        <div className='container'>
          <SearchBar />
        </div>
      </div>
    </>
  );
}
