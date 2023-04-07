import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import { FEED_URL, LOGIN_URL } from '../../lib/routes';
import { SearchBar } from '../SearchBar/SearchBar';
import { UserMenu } from './UserMenu';

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
