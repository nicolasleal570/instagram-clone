import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { UserContextProvider } from '../../contexts/UserContext';
import { AuthContextProvider } from '../../contexts/AuthContext';

import 'react-toastify/dist/ReactToastify.css';

export function Layout() {
  return (
    <UserContextProvider>
      <AuthContextProvider>
        <main className='body'>
          <Outlet />
          <ToastContainer />
        </main>
      </AuthContextProvider>
    </UserContextProvider>
  );
}
