import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { UserContextProvider } from '../../contexts/UserContext';
import { AuthContextProvider, SetupUser } from '../../contexts/AuthContext';

import 'react-toastify/dist/ReactToastify.css';
import { Navbar } from '../Navbar/Navbar';

export function CommonLayout() {
  return (
    <UserContextProvider>
      <AuthContextProvider>
        <main className='body'>
          <Outlet />
          <SetupUser />
          <ToastContainer />
        </main>
      </AuthContextProvider>
    </UserContextProvider>
  );
}

export function FeedLayout() {
  return (
    <>
      <Navbar />
      <main className='body'>
        <Outlet />
        <ToastContainer />
      </main>
    </>
  );
}
