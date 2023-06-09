import { Popover } from '@headlessui/react';
import { useAuth } from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { LOGIN_URL, MY_PROFILE_URL } from '../../lib/routes';
import { NotificationKind, useNotify } from '../../hooks/useNotify';
import { usePost } from '../../hooks/usePost';
import { exportDataAsJSON } from '../../lib/exportData';
import { ImportJsonFile } from '../ImportJsonFile/ImportJsonFile';

export function UserMenu() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const { setIsCreateModalOpen, currentUserPosts } = usePost();
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

  const handleExportData = () => {
    exportDataAsJSON(currentUserPosts, 'posts.json');
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
            <button
              type='button'
              className='block'
              onClick={handleCreatePublication}
            >
              <p className='px-4 text-gray-800 hover:text-indigo-500'>Crear</p>
            </button>
            <Popover.Button
              as='button'
              type='button'
              className='block'
              onClick={handleExportData}
            >
              <p className='px-4 text-gray-800 hover:text-indigo-500'>
                Exportar
              </p>
            </Popover.Button>
            <ImportJsonFile />
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
