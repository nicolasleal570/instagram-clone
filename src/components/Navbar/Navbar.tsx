import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Popover } from '@headlessui/react';
import { useAuth } from '../../hooks/useAuth';
import { InputField } from '../InputField/InputField';
import { Link, useNavigate } from 'react-router-dom';
import { LOGIN_URL, PROFILE_URL } from '../../lib/routes';
import { NotificationKind, useNotify } from '../../hooks/useNotify';

export function UserMenu() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const { notify } = useNotify();

  const handleCreatePublication = () => {
    console.log('CREATEEE');
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
      <Popover.Button className='block h-10 w-10'>
        <img
          className='h-full w-full rounded object-cover object-center'
          src={currentUser?.avatar}
        />
      </Popover.Button>
      <Popover.Overlay className='fixed inset-0 h-screen w-full bg-black opacity-30' />

      <Popover.Panel className='absolute right-0 z-10 block min-w-[200px] rounded border border-gray-200 bg-white'>
        <div className='grid grid-cols-1 text-sm'>
          <p className='border-b border-gray-200 p-4 font-semibold'>
            {currentUser?.name} {currentUser?.surname}
          </p>
          <p className='border-b border-gray-200 p-4'>200 publicaciones</p>

          <ul className='space-y-4 border-b border-gray-200 py-4'>
            <li>
              <Link to={PROFILE_URL}>
                <p className='px-4'>Perfil</p>
              </Link>
            </li>
            <li>
              <button type='button' onClick={handleCreatePublication}>
                <p className='px-4'>Crear</p>
              </button>
            </li>
          </ul>

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
    <nav className='border-b border-gray-200 py-8'>
      <div className='container flex w-full items-end justify-between md:items-center'>
        <div className='mr-6 flex w-full flex-col sm:w-auto sm:flex-row sm:items-center sm:justify-between md:mr-0'>
          <h1 className='mr-6 text-lg font-semibold md:text-2xl'>DTech Inc.</h1>
          <InputField
            type='text'
            name='search'
            leadIcon={<MagnifyingGlassIcon className='h-5 w-5 text-inherit' />}
          />
        </div>

        {!isLoggedIn ? <div>No user</div> : <UserMenu />}
      </div>
    </nav>
  );
}
